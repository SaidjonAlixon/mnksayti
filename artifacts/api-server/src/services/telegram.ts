import type { StoredFile } from "./storage.js";

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
  const location =
    data.homeAddress?.trim() ||
    [data.city, data.state, data.zip].filter(Boolean).join(", ");

  const lines = [
    "🚛 <b>MNK Logistics — New Driver Application</b>",
    `ID: <code>${escapeHtml(data.applicationId)}</code>`,
    "",
    "<b>Position</b>",
    escapeHtml(data.position),
    "",
    "<b>Contact</b>",
    `• Name: <b>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</b>`,
    `• Phone: ${escapeHtml(data.phone)}`,
    `• Email: ${escapeHtml(data.email)}`,
    `• Address: ${escapeHtml(location)}`,
    "",
    "<b>Experience</b>",
    `• CDL class: ${escapeHtml(data.cdlClass)}`,
    `• Years OTR: ${escapeHtml(data.yearsOTR)}`,
    `• Endorsements: ${escapeHtml(data.endorsements || "—")}`,
    `• Preferred lanes: ${escapeHtml(data.preferredLanes || "—")}`,
    `• Currently employed: ${escapeHtml(data.currentlyEmployed || "—")}`,
    "",
    `<b>Files (${data.files.length})</b>`,
  ];

  if (data.files.length > 0) {
    for (const f of data.files) {
      lines.push(`• <a href="${escapeAttr(f.url)}">${escapeHtml(f.field)}</a>`);
    }
  } else {
    lines.push("• No files");
  }

  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

/** Notify Telegram with application details + Blob download links only (no file uploads). */
export async function notifyDriverApplication(data: DriverApplicationPayload): Promise<void> {
  const config = getTelegramConfig();
  if (!config) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification");
    return;
  }

  await sendTelegramMessage(config.token, config.chatId, formatMessage(data));
}
