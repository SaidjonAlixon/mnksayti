import type { DriverApplicationForm, DriverFileField } from "./types";

const FILE_FIELDS: DriverFileField[] = [
  "cdlFront",
  "cdlBack",
  "medicalCard",
  "resume",
  "referenceLetter",
];

export async function submitDriverApplication(
  form: DriverApplicationForm,
): Promise<{ applicationId: string }> {
  const body = new FormData();

  body.append(
    "data",
    JSON.stringify({
      applicationId: form.applicationId || undefined,
      position: form.position,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      city: form.city,
      state: form.state,
      zip: form.zip,
      homeAddress: form.homeAddress,
      dateOfBirth: form.dateOfBirth,
      cdlClass: form.cdlClass,
      yearsOTR: form.yearsOTR,
      endorsements: form.endorsements,
      preferredLanes: form.preferredLanes,
      currentlyEmployed: form.currentlyEmployed,
      additionalNotes: form.additionalNotes,
    }),
  );

  const uploadedList = FILE_FIELDS.map((field) => form.uploadedFiles[field]).filter(Boolean);
  if (uploadedList.length > 0) {
    body.append("uploadedFiles", JSON.stringify(uploadedList));
  }

  // Fallback: send raw files if blob upload did not complete for a field
  for (const field of FILE_FIELDS) {
    if (form.uploadedFiles[field]) continue;
    const file = form[field];
    if (file) body.append(field, file, file.name);
  }

  const response = await fetch("/api/driver-application", {
    method: "POST",
    body,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.error ?? "Submission failed");
  }

  return { applicationId: json.applicationId };
}
