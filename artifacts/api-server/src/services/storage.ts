import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

import type { Express } from "express";

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_UPLOAD_ROOT = path.resolve(artifactDir, "../../uploads");

export type StoredFile = {
  field: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
};

type MulterFile = Express.Multer.File;

function getApiPublicUrl(): string {
  if (process.env.API_PUBLIC_URL) {
    return process.env.API_PUBLIC_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? "24708"}`;
}

export async function storeUploadedFile(
  field: string,
  file: MulterFile,
  applicationId: string,
): Promise<StoredFile> {
  const safeName = file.originalname.replace(/[^\w.\-() ]+/g, "_");
  const key = `driver-applications/${applicationId}/${field}-${Date.now()}-${safeName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.mimetype,
    });
    return {
      field,
      originalName: file.originalname,
      url: blob.url,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  const dir = path.join(LOCAL_UPLOAD_ROOT, applicationId);
  await mkdir(dir, { recursive: true });
  const filename = `${field}-${Date.now()}-${safeName}`;
  const fullPath = path.join(dir, filename);
  await writeFile(fullPath, file.buffer);

  const baseUrl = getApiPublicUrl();
  return {
    field,
    originalName: file.originalname,
    url: `${baseUrl}/uploads/${applicationId}/${encodeURIComponent(filename)}`,
    size: file.size,
    mimeType: file.mimetype,
  };
}

export function newApplicationId(): string {
  return randomUUID();
}
