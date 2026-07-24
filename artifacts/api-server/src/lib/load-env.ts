import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function readEnvText(envPath: string): string {
  const buf = readFileSync(envPath);
  // Handle UTF-16 LE (common when saved from some Windows editors)
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le").replace(/^\uFEFF/, "");
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const swapped = Buffer.alloc(buf.length - 2);
    for (let i = 2; i + 1 < buf.length; i += 2) {
      swapped[i - 2] = buf[i + 1];
      swapped[i - 1] = buf[i];
    }
    return swapped.toString("utf16le");
  }
  // UTF-16 LE without BOM: many NULs in even positions
  if (buf.length > 8 && buf[1] === 0 && buf[3] === 0 && buf[5] === 0) {
    return buf.toString("utf16le").replace(/^\uFEFF/, "");
  }
  return buf.toString("utf8").replace(/^\uFEFF/, "");
}

/** Load monorepo-root `.env` into process.env (does not override existing vars). */
export function loadEnvFile(): void {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../.env"),
    path.resolve(process.cwd(), "../../.env"),
    path.resolve(here, ".env"),
    path.resolve(here, "../.env"),
    path.resolve(here, "../../.env"),
    path.resolve(here, "../../../.env"),
    path.resolve(here, "../../../../.env"),
  ];

  const envPath = candidates.find((p) => existsSync(p));
  if (!envPath) return;

  const text = readEnvText(envPath);
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
