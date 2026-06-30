export type ParsedAddress = {
  city: string;
  state: string;
  zip: string;
};

/** Accepts US format or any free-form address (international-friendly). */
export function parseHomeAddress(value: string): ParsedAddress | null {
  const trimmed = value.trim();
  if (trimmed.length < 3) return null;

  const usMatch = trimmed.match(/^(.+?),\s*([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)\s*$/);
  if (usMatch) {
    return {
      city: usMatch[1].trim().slice(0, 80),
      state: usMatch[2].toUpperCase(),
      zip: usMatch[3],
    };
  }

  const zipTail = trimmed.match(/(\d{5,6}(?:-\d{4})?)\s*$/);
  const zip = zipTail ? zipTail[1] : "00000";
  const withoutZip = zipTail
    ? trimmed.slice(0, trimmed.length - zipTail[0].length).replace(/,\s*$/, "").trim()
    : trimmed;

  const parts = withoutZip.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    if (/^[A-Za-z]{2,10}$/.test(last)) {
      return {
        city: parts.slice(0, -1).join(", ").slice(0, 80) || withoutZip.slice(0, 80),
        state: last.toUpperCase().slice(0, 10),
        zip,
      };
    }
  }

  return {
    city: trimmed.slice(0, 80),
    state: "NA",
    zip: zip.length >= 5 ? zip.slice(0, 12) : "00000",
  };
}

export function formatHomeAddress(city: string, state: string, zip: string, full?: string): string {
  if (full?.trim()) return full.trim();
  if (!city && !state && !zip) return "";
  if (city && state && state !== "NA" && zip !== "00000") {
    return `${city}, ${state} ${zip}`;
  }
  return city || [city, state, zip].filter(Boolean).join(", ");
}
