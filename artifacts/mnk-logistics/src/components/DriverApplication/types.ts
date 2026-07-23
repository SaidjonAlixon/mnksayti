export type DriverPosition = "company_driver" | "owner_operator";

export type DriverApplicationForm = {
  position: DriverPosition | "";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
  dateOfBirth: string;
  cdlClass: "A" | "B" | "";
  yearsOTR: string;
  endorsements: string;
  preferredLanes: string;
  currentlyEmployed: string;
  additionalNotes: string;
  cdlFront: File | null;
  cdlBack: File | null;
  medicalCard: File | null;
  resume: File | null;
  referenceLetter: File | null;
};

export const EMPTY_DRIVER_FORM: DriverApplicationForm = {
  position: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  homeAddress: "",
  city: "",
  state: "",
  zip: "",
  dateOfBirth: "",
  cdlClass: "",
  yearsOTR: "",
  endorsements: "",
  preferredLanes: "",
  currentlyEmployed: "",
  additionalNotes: "",
  cdlFront: null,
  cdlBack: null,
  medicalCard: null,
  resume: null,
  referenceLetter: null,
};

export const POSITIONS = [
  {
    id: "company_driver" as const,
    title: "Company Driver",
    desc: "Drive our trucks — weekly pay, modern fleet, guaranteed home time.",
    tags: ["$0.70/mi", "Weekly Pay", "Benefits"],
  },
  {
    id: "owner_operator" as const,
    title: "Owner Operator",
    desc: "Bring your own truck — high percentage pay and dedicated dispatch.",
    tags: ["High %", "Fuel Cards", "Flexibility"],
  },
];
