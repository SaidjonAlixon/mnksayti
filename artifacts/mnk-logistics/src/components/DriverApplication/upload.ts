import type { DriverFileField, UploadedDriverFile } from "./types";

export async function uploadDriverFile(
  field: DriverFileField,
  file: File,
  sessionId: string,
): Promise<{ sessionId: string; file: UploadedDriverFile }> {
  const body = new FormData();
  body.append("field", field);
  body.append("sessionId", sessionId);
  body.append("file", file, file.name);

  const response = await fetch("/api/driver-application/upload", {
    method: "POST",
    body,
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error ?? "Upload failed");
  }

  return {
    sessionId: json.sessionId as string,
    file: json.file as UploadedDriverFile,
  };
}
