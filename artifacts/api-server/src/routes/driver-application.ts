import { Router, type IRouter } from "express";
import multer from "multer";
import { z } from "zod";
import { newApplicationId, storeUploadedFile, type StoredFile } from "../services/storage.js";
import { notifyDriverApplication } from "../services/telegram.js";
import { logger } from "../lib/logger.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: process.env.VERCEL ? 4 * 1024 * 1024 : 15 * 1024 * 1024,
    files: 12,
  },
});

const applicationSchema = z.object({
  position: z.enum(["company_driver", "owner_operator"]),
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/, "Invalid first name"),
  lastName: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/, "Invalid last name"),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 10, "US phone must be 10 digits"),
  email: z.string().email().max(120),
  city: z.string().min(1).max(80),
  state: z.string().min(2).max(10),
  zip: z.string().min(5).max(12),
  homeAddress: z.string().max(300).optional().default(""),
  dateOfBirth: z.string().max(20).optional().default(""),
  cdlClass: z.enum(["A", "B"]),
  yearsOTR: z.string().min(1).max(4),
  endorsements: z.string().max(200).optional().default(""),
  preferredLanes: z.string().max(300).optional().default(""),
  currentlyEmployed: z.string().max(120).optional().default(""),
  additionalNotes: z.string().max(2000).optional().default(""),
  applicationId: z.string().min(8).max(80).optional(),
});

const FILE_FIELDS = [
  "cdlFront",
  "cdlBack",
  "medicalCard",
  "resume",
  "referenceLetter",
] as const;

type FileField = (typeof FILE_FIELDS)[number];

const FILE_FIELD_LABELS: Record<FileField, string> = {
  cdlFront: "CDL Front",
  cdlBack: "CDL Back",
  medicalCard: "Medical Card",
  resume: "Resume",
  referenceLetter: "Reference Letter",
};

const POSITION_LABELS: Record<string, string> = {
  company_driver: "Company Driver",
  owner_operator: "Owner Operator",
};

const storedFileSchema = z.object({
  field: z.enum(FILE_FIELDS),
  originalName: z.string().min(1).max(260),
  url: z.string().url().max(2000),
  size: z.number().int().nonnegative(),
  mimeType: z.string().min(1).max(120),
});

const router: IRouter = Router();

/** Upload a single file to Blob immediately (UI turns green after this succeeds). */
router.post("/driver-application/upload", upload.single("file"), async (req, res) => {
  try {
    const field = String(req.body.field ?? "") as FileField;
    if (!FILE_FIELDS.includes(field)) {
      res.status(400).json({ error: "Invalid file field" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const sessionId =
      typeof req.body.sessionId === "string" && req.body.sessionId.length > 8
        ? req.body.sessionId
        : newApplicationId();

    const stored = await storeUploadedFile(field, req.file, sessionId);

    logger.info(
      { sessionId, field, blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN) },
      "Driver file uploaded",
    );

    res.status(201).json({
      ok: true,
      sessionId,
      storage: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local",
      file: stored,
    });
  } catch (err) {
    logger.error({ err }, "Driver file upload failed");
    res.status(500).json({ error: "Failed to upload file" });
  }
});

router.post(
  "/driver-application",
  upload.fields(FILE_FIELDS.map((name) => ({ name, maxCount: 1 }))),
  async (req, res) => {
    try {
      const raw = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;
      const parsed = applicationSchema.safeParse(raw);

      if (!parsed.success) {
        res.status(400).json({ error: "Invalid application data", details: parsed.error.flatten() });
        return;
      }

      const applicationId = parsed.data.applicationId ?? newApplicationId();
      const uploaded = req.files as Record<string, Express.Multer.File[]> | undefined;
      const storedFiles: StoredFile[] = [];

      let preUploaded: StoredFile[] = [];
      if (typeof req.body.uploadedFiles === "string" && req.body.uploadedFiles.trim()) {
        const parsedFiles = z.array(storedFileSchema).safeParse(JSON.parse(req.body.uploadedFiles));
        if (!parsedFiles.success) {
          res.status(400).json({ error: "Invalid uploadedFiles payload" });
          return;
        }
        preUploaded = parsedFiles.data;
      }

      const fieldsSeen = new Set<string>();

      for (const field of FILE_FIELDS) {
        const file = uploaded?.[field]?.[0];
        if (file) {
          storedFiles.push(await storeUploadedFile(field, file, applicationId));
          fieldsSeen.add(field);
          continue;
        }
        const existing = preUploaded.find((f) => f.field === field);
        if (existing) {
          storedFiles.push(existing);
          fieldsSeen.add(field);
        }
      }

      const requiredDocs = ["cdlFront", "cdlBack", "medicalCard"] as const;
      const missing = requiredDocs.filter((f) => !fieldsSeen.has(f));
      if (missing.length > 0) {
        res.status(400).json({ error: `Missing required files: ${missing.join(", ")}` });
        return;
      }

      const labeledFiles = storedFiles.map((f) => ({
        ...f,
        field: FILE_FIELD_LABELS[f.field as FileField] ?? f.field,
      }));

      const payload = {
        applicationId,
        ...parsed.data,
        position: POSITION_LABELS[parsed.data.position] ?? parsed.data.position,
        files: labeledFiles,
      };

      await notifyDriverApplication(payload);

      logger.info(
        {
          applicationId,
          files: labeledFiles.length,
          blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
          telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
        },
        "Driver application submitted",
      );

      res.status(201).json({
        ok: true,
        applicationId,
        filesUploaded: labeledFiles.length,
      });
    } catch (err) {
      logger.error({ err }, "Driver application failed");
      res.status(500).json({ error: "Failed to submit application" });
    }
  },
);

export default router;
