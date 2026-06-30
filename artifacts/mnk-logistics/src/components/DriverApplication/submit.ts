import type { DriverApplicationForm } from "./types";

export async function submitDriverApplication(form: DriverApplicationForm): Promise<{ applicationId: string }> {
  const body = new FormData();

  body.append(
    "data",
    JSON.stringify({
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

  const fileFields = [
    "cdlFront",
    "cdlBack",
    "medicalCard",
    "mvrReport",
    "resume",
    "referenceLetter",
  ] as const;

  for (const field of fileFields) {
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
