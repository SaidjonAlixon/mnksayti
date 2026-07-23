import { Router, type IRouter } from "express";
import multer from "multer";
import { z } from "zod";
import { newApplicationId, storeUploadedFile } from "../services/storage.js";
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
  dateOfBirth: z.string().min(4).max(20),
  cdlClass: z.enum(["A", "B"]),
  yearsOTR: z.string().min(1).max(4),
  endorsements: z.string().max(200).optional().default(""),
  preferredLanes: z.string().max(300).optional().default(""),
  currentlyEmployed: z.string().max(120).optional().default(""),
  additionalNotes: z.string().max(2000).optional().default(""),
});

const FILE_FIELDS = [
  "cdlFront",
  "cdlBack",
  "medicalCard",
  "resume",
  "referenceLetter",
] as const;

const POSITION_LABELS: Record<string, string> = {
  company_driver: "Company Driver",
  owner_operator: "Owner Operator",
};

const router: IRouter = Router();

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

      const applicationId = newApplicationId();
      const uploaded = req.files as Record<string, Express.Multer.File[]> | undefined;
      const storedFiles = [];
      const fileBuffers = new Map<string, Express.Multer.File>();

      for (const field of FILE_FIELDS) {
        const file = uploaded?.[field]?.[0];
        if (!file) continue;
        fileBuffers.set(field, file);
        storedFiles.push(await storeUploadedFile(field, file, applicationId));
      }

      const requiredDocs = ["cdlFront", "cdlBack", "medicalCard"] as const;
      const missing = requiredDocs.filter((f) => !fileBuffers.has(f));
      if (missing.length > 0) {
        res.status(400).json({ error: `Missing required files: ${missing.join(", ")}` });
        return;
      }

      const payload = {
        applicationId,
        ...parsed.data,
        position: POSITION_LABELS[parsed.data.position] ?? parsed.data.position,
        files: storedFiles,
      };

      await notifyDriverApplication(payload, fileBuffers);

      logger.info({ applicationId, files: storedFiles.length }, "Driver application submitted");

      res.status(201).json({
        ok: true,
        applicationId,
        filesUploaded: storedFiles.length,
      });
    } catch (err) {
      logger.error({ err }, "Driver application failed");
      res.status(500).json({ error: "Failed to submit application" });
    }
  },
);

export default router;
