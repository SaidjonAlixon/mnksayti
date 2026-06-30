import type { Express } from "express";
import type { StoredFile } from "./storage.js";

type MulterFile = Express.Multer.File;

type DriverApplicationPayload = {
  applicationId: string;
  position: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  homeAddress?: string;
  dateOfBirth: string;
  cdlClass: string;
  yearsOTR: string;
  endorsements: string;
  preferredLanes: string;
  currentlyEmployed: string;
  additionalNotes: string;
  files: StoredFile[];
};

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return null;
  }
  return { token, chatId };
}

function formatMessage(data: DriverApplicationPayload): string {
  const lines = [
    "🚛 <b>MNK — New Driver Application</b>",
    `ID: <code>${data.applicationId}</code>`,
    "",
    `<b>Position:</b> ${escapeHtml(data.position)}`,
    "",
    "<b>Contact</b>",
    `Name: ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`,
    `Phone: ${escapeHtml(data.phone)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Location: ${escapeHtml(data.homeAddress?.trim() || `${data.city}, ${data.state} ${data.zip}`)}`,
    `DOB: ${escapeHtml(data.dateOfBirth)}`,
    "",
    "<b>Experience</b>",
    `CDL: ${escapeHtml(data.cdlClass)}`,
    `Years OTR: ${escapeHtml(data.yearsOTR)}`,
    `Endorsements: ${escapeHtml(data.endorsements || "—")}`,
    `Preferred lanes: ${escapeHtml(data.preferredLanes || "—")}`,
    `Currently employed: ${escapeHtml(data.currentlyEmployed || "—")}`,
    "",
    "<b>Notes</b>",
    escapeHtml(data.additionalNotes || "—"),
    "",
    `<b>Files:</b> ${data.files.length}`,
  ];

  if (data.files.length > 0) {
    lines.push("");
    for (const f of data.files) {
      lines.push(`• ${escapeHtml(f.field)}: <a href="${f.url}">${escapeHtml(f.originalName)}</a>`);
    }
  }

  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function telegramRequest(
  token: string,
  method: string,
  body: FormData | Record<string, string | boolean>,
): Promise<void> {
  const isFormData = body instanceof FormData;
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram ${method} failed: ${response.status} ${text}`);
  }
}

export async function notifyDriverApplication(
  data: DriverApplicationPayload,
  fileBuffers?: Map<string, MulterFile>,
): Promise<void> {
  const config = getTelegramConfig();
  if (!config) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification");
    return;
  }

  const { token, chatId } = config;

  await telegramRequest(token, "sendMessage", {
    chat_id: chatId,
    text: formatMessage(data),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  for (const file of data.files) {
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("caption", `${file.field}: ${file.originalName}`);

    const bufferFile = fileBuffers?.get(file.field);
    if (bufferFile) {
      const blob = new Blob([new Uint8Array(bufferFile.buffer)], { type: bufferFile.mimetype });
      form.append("document", blob, bufferFile.originalname);
    } else if (file.url.startsWith("http")) {
      form.append("document", file.url);
    } else {
      continue;
    }

    await telegramRequest(token, "sendDocument", form);
  }
}
