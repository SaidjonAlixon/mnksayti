/** Public company contact — keep in sync across the site. */
export const COMPANY = {
  name: "MNK Logistics LLC",
  phoneDisplay: "(412) 729-2000",
  phoneTel: "+14127292000",
  email: "dispatch@mnklogistics.com",
  website: "https://mnklogistics.com",
  street: "785 Arch St",
  city: "Carnegie",
  state: "PA",
  zip: "15106",
  addressLine: "785 Arch St, Carnegie, PA 15106",
  cityState: "Carnegie, PA",
  mapEmbed:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("785 Arch St, Carnegie, PA 15106") +
    "&z=15&hl=en&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("785 Arch St, Carnegie, PA 15106"),
} as const;
