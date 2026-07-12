/** Letters, spaces, hyphen, apostrophe — US-style personal names. */
const NAME_CHAR_RE = /[^A-Za-z\s'\-]/g;
const NAME_VALID_RE = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;

export function formatPersonName(raw: string): string {
  return raw.replace(NAME_CHAR_RE, "").replace(/\s{2,}/g, " ").slice(0, 40);
}

export function isValidPersonName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 2 && NAME_VALID_RE.test(trimmed);
}

/** Digits only, max 10 for US local number (no country code required in field). */
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 10);
}

/** Format as (555) 000-0000 while typing. */
export function formatUsPhone(raw: string): string {
  const d = digitsOnly(raw);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isValidUsPhone(value: string): boolean {
  return digitsOnly(value).length === 10;
}
