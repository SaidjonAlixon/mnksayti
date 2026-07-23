import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, Upload, Check, Truck, User, FileCheck, ClipboardList, Mail, Phone, MapPin, FileText, type LucideIcon } from "lucide-react";
import { useDriverApplication } from "../../context/DriverApplicationContext";
import { EMPTY_DRIVER_FORM, POSITIONS, type DriverApplicationForm } from "./types";
import { submitDriverApplication } from "./submit";
import { formatHomeAddress, parseHomeAddress } from "./parseAddress";
import {
  digitsOnly,
  formatPersonName,
  formatUsPhone,
  isValidPersonName,
  isValidUsPhone,
} from "./contactInput";

type ContactFieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  homeAddress?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function getContactFieldErrors(form: DriverApplicationForm): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  else if (!isValidPersonName(form.firstName)) errors.firstName = "Use letters only (min 2 characters)";

  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  else if (!isValidPersonName(form.lastName)) errors.lastName = "Use letters only (min 2 characters)";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email (name@example.com)";

  const phoneDigits = digitsOnly(form.phone).length;
  if (!form.phone.trim()) errors.phone = "US phone number is required";
  else if (phoneDigits < 10) errors.phone = `Need ${10 - phoneDigits} more digit${10 - phoneDigits === 1 ? "" : "s"} (US 10 digits)`;
  else if (!isValidUsPhone(form.phone)) errors.phone = "Enter a valid US number: (555) 000-0000";

  if (!form.homeAddress.trim()) errors.homeAddress = "Home address is required";
  else if (!parseHomeAddress(form.homeAddress)) errors.homeAddress = "Enter a fuller address (street, city…)";

  return errors;
}

const STEPS = [
  { label: "Position", icon: Truck },
  { label: "Contact", icon: User },
  { label: "Experience", icon: FileCheck },
  { label: "Review", icon: ClipboardList },
];

function IconField({
  label,
  icon: Icon,
  className = "",
  error,
  hint,
  ...props
}: {
  label: string;
  icon: LucideIcon;
  className?: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`dap-icon-field ${error ? "dap-icon-field--error" : ""} ${className}`.trim()}>
      <span className="dap-icon-label">{label}</span>
      <div className="dap-icon-input-wrap">
        <Icon size={18} className="dap-icon-input-icon" aria-hidden="true" />
        <input className="dap-icon-input" aria-invalid={!!error} {...props} />
      </div>
      {error ? <span className="dap-field-error">{error}</span> : hint ? <span className="dap-field-hint">{hint}</span> : null}
    </label>
  );
}

function ExperienceFileBox({
  title,
  subtext,
  accept,
  file,
  onChange,
  wide,
  icon: Icon = Upload,
}: {
  title: string;
  subtext: string;
  accept: string;
  file: File | null;
  onChange: (f: File | null) => void;
  wide?: boolean;
  icon?: LucideIcon;
}) {
  const pick = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onChange(dropped);
  };

  return (
    <label
      className={`dap-exp-upload ${wide ? "dap-exp-upload--wide" : ""} ${file ? "dap-exp-upload--filled" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <input type="file" accept={accept} onChange={pick} className="dap-file-input" />
      <span className="dap-exp-upload-icon"><Icon size={wide ? 20 : 18} /></span>
      <span className="dap-exp-upload-body">
        <span className="dap-exp-upload-title">{file ? file.name : title}</span>
        <span className="dap-exp-upload-sub">{subtext}</span>
      </span>
      {file && <span className="dap-file-ok"><Check size={14} /></span>}
    </label>
  );
}

const CDL_OPTIONS = [
  { value: "A", label: "Class A" },
  { value: "B", label: "Class B" },
] as const;

function CdlTypeSelect({
  value,
  onChange,
}: {
  value: "A" | "B" | "";
  onChange: (value: "A" | "B" | "") => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = CDL_OPTIONS.find((o) => o.value === value)?.label ?? "Select CDL Type…";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`dap-exp-select-wrap dap-exp-select-dropdown ${open ? "dap-exp-select-dropdown--open" : ""}`}
    >
      <span className="dap-exp-sr">CDL type</span>
      <button
        type="button"
        className={`dap-exp-select-trigger ${value ? "dap-exp-select-trigger--filled" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </button>
      <ChevronDown size={18} className="dap-exp-select-chevron" aria-hidden="true" />
      {open && (
        <ul className="dap-exp-select-menu" role="listbox" aria-label="CDL type">
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              className={`dap-exp-select-option dap-exp-select-option--placeholder ${value === "" ? "dap-exp-select-option--active" : ""}`}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Select CDL Type…
            </button>
          </li>
          {CDL_OPTIONS.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`dap-exp-select-option ${value === option.value ? "dap-exp-select-option--active" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DriverExperienceStep({
  form,
  patch,
}: {
  form: DriverApplicationForm;
  patch: (partial: Partial<DriverApplicationForm>) => void;
}) {
  return (
    <div className="dap-exp">
      <CdlTypeSelect value={form.cdlClass} onChange={(cdlClass) => patch({ cdlClass })} />

      <label className="dap-exp-field">
        <span className="dap-exp-label">Years of commercial driving experience?</span>
        <input
          className="dap-exp-input"
          type="number"
          min={0}
          placeholder="0"
          value={form.yearsOTR}
          onChange={(e) => patch({ yearsOTR: e.target.value })}
        />
      </label>

      <div className="dap-exp-section">
        <span className="dap-exp-label">Driver license (both sides)</span>
        <div className="dap-exp-upload-row">
          <ExperienceFileBox
            title="Front side"
            subtext="PDF, JPG, PNG"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            file={form.cdlFront}
            onChange={(f) => patch({ cdlFront: f })}
          />
          <ExperienceFileBox
            title="Back side"
            subtext="PDF, JPG, PNG"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            file={form.cdlBack}
            onChange={(f) => patch({ cdlBack: f })}
          />
        </div>
      </div>

      <div className="dap-exp-section">
        <span className="dap-exp-label">Medical card</span>
        <ExperienceFileBox
          wide
          title="Choose file"
          subtext="PDF, JPG, PNG up to 10MB"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          file={form.medicalCard}
          onChange={(f) => patch({ medicalCard: f })}
        />
      </div>

      <div className="dap-exp-section">
        <span className="dap-exp-label">Resume / document <em>(optional)</em></span>
        <ExperienceFileBox
          wide
          icon={FileText}
          title="Attach resume (optional)"
          subtext="PDF, DOCX up to 10MB — click, or drag and drop here"
          accept=".pdf,.doc,.docx"
          file={form.resume}
          onChange={(f) => patch({ resume: f })}
        />
      </div>
    </div>
  );
}

export function DriverApplicationModal() {
  const { isOpen, close } = useDriverApplication();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DriverApplicationForm>(EMPTY_DRIVER_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const [addressError, setAddressError] = useState("");
  const [contactError, setContactError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [stepHint, setStepHint] = useState("");

  const patch = (partial: Partial<DriverApplicationForm>) => setForm((f) => ({ ...f, ...partial }));

  const reset = () => {
    setStep(0);
    setForm(EMPTY_DRIVER_FORM);
    setStatus("idle");
    setError("");
    setApplicationId("");
    setAddressError("");
    setContactError("");
    setFieldErrors({});
    setStepHint("");
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 300);
  };

  const canSubmit = () => !!form.dateOfBirth;

  const handleSubmit = async () => {
    setStatus("submitting");
    setError("");
    try {
      const result = await submitDriverApplication(form);
      setApplicationId(result.applicationId);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Submission failed");
    }
  };

  const clearFieldError = (key: keyof ContactFieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setContactError("");
    setStepHint("");
  };

  const handleContinue = () => {
    setStepHint("");
    setContactError("");
    setAddressError("");

    if (step === 0 && !form.position) {
      setStepHint("Select a position to continue");
      return;
    }

    if (step === 1) {
      const errors = getContactFieldErrors(form);
      setFieldErrors(errors);
      const messages = Object.values(errors).filter(Boolean);
      if (messages.length > 0) {
        setContactError(messages[0] ?? "");
        setStepHint(`Fix ${messages.length} field${messages.length === 1 ? "" : "s"} above to continue`);
        return;
      }

      const parsed = parseHomeAddress(form.homeAddress);
      if (!parsed) {
        setFieldErrors({ homeAddress: "Enter a fuller address (street, city…)" });
        setAddressError("Enter a fuller address (street, city…)");
        setStepHint("Fix the address field to continue");
        return;
      }

      setFieldErrors({});
      patch({ city: parsed.city, state: parsed.state, zip: parsed.zip });
    }

    if (step === 2) {
      const missing: string[] = [];
      if (!form.cdlClass) missing.push("CDL type");
      if (!form.yearsOTR) missing.push("years of experience");
      if (!form.cdlFront) missing.push("CDL front photo");
      if (!form.cdlBack) missing.push("CDL back photo");
      if (!form.medicalCard) missing.push("medical card");
      if (missing.length) {
        setStepHint(`Still needed: ${missing.join(", ")}`);
        return;
      }
    }

    setStep((s) => s + 1);
  };

  const positionLabel = POSITIONS.find((p) => p.id === form.position)?.title ?? "—";

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { style: htmlStyle } = html;
    const { style: bodyStyle } = document.body;
    const previous = {
      htmlOverflow: htmlStyle.overflow,
      bodyOverflow: bodyStyle.overflow,
    };

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";

    return () => {
      htmlStyle.overflow = previous.htmlOverflow;
      bodyStyle.overflow = previous.bodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="dap-overlay" role="dialog" aria-modal="true" aria-labelledby="dap-title">
      <motion.div
        className="dap-shell"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="dap-hazard" aria-hidden="true" />

        <header className="dap-header">
          <div>
            <span className="dap-badge">MNK LOGISTICS LLC</span>
            <h2 id="dap-title" className="dap-title">
              Driver <span>Application</span>
            </h2>
            <p className="dap-sub">Step {step + 1} of {STEPS.length} — {STEPS[step].label}</p>
          </div>
          <button type="button" className="dap-close" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className="dap-stepper">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <div key={s.label} className={`dap-stepper-item ${active ? "dap-stepper-item--active" : ""} ${done ? "dap-stepper-item--done" : ""}`}>
                {i > 0 && <span className={`dap-stepper-line ${i <= step ? "dap-stepper-line--done" : ""}`} aria-hidden="true" />}
                <div className="dap-stepper-node">
                  {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} strokeWidth={2} />}
                </div>
                <span className="dap-stepper-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div
          className="dap-body"
          onWheel={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" className="dap-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="dap-success-icon"><Check size={32} /></div>
                <h3>Application received</h3>
                <p>Our recruiting team will contact you within 24 hours.</p>
                <span className="dap-success-id">Ref: {applicationId.slice(0, 8).toUpperCase()}</span>
                <button type="button" className="dap-btn dap-btn--primary" onClick={handleClose}>Close</button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <div className="dap-positions">
                    <p className="dap-lead">Choose the program that fits your situation.</p>
                    {POSITIONS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`dap-position ${form.position === p.id ? "dap-position--active" : ""}`}
                        onClick={() => patch({ position: p.id })}
                      >
                        <span className="dap-position-num">{p.id === "company_driver" ? "01" : "02"}</span>
                        <span className="dap-position-body">
                          <strong>{p.title}</strong>
                          <span>{p.desc}</span>
                          <span className="dap-position-tags">
                            {p.tags.map((t) => <em key={t}>{t}</em>)}
                          </span>
                        </span>
                        <span className="dap-position-radio" />
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="dap-contact">
                    <div className="dap-row">
                      <IconField
                        label="First name"
                        icon={User}
                        placeholder="John"
                        value={form.firstName}
                        error={fieldErrors.firstName}
                        onChange={(e) => {
                          clearFieldError("firstName");
                          patch({ firstName: formatPersonName(e.target.value) });
                        }}
                        autoComplete="given-name"
                        inputMode="text"
                        spellCheck={false}
                        maxLength={40}
                      />
                      <IconField
                        label="Last name"
                        icon={User}
                        placeholder="Doe"
                        value={form.lastName}
                        error={fieldErrors.lastName}
                        onChange={(e) => {
                          clearFieldError("lastName");
                          patch({ lastName: formatPersonName(e.target.value) });
                        }}
                        autoComplete="family-name"
                        inputMode="text"
                        spellCheck={false}
                        maxLength={40}
                      />
                    </div>
                    <IconField
                      label="Email address"
                      icon={Mail}
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      error={fieldErrors.email}
                      onChange={(e) => {
                        clearFieldError("email");
                        patch({ email: e.target.value });
                      }}
                      autoComplete="email"
                    />
                    <IconField
                      label="Phone number"
                      icon={Phone}
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      error={fieldErrors.phone}
                      hint={
                        form.phone && digitsOnly(form.phone).length < 10
                          ? `US numbers only · ${digitsOnly(form.phone).length}/10 digits`
                          : "US numbers only · 10 digits"
                      }
                      onChange={(e) => {
                        clearFieldError("phone");
                        patch({ phone: formatUsPhone(e.target.value) });
                      }}
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={14}
                      pattern="\(\d{3}\) \d{3}-\d{4}"
                    />
                    <IconField
                      label="Home address"
                      icon={MapPin}
                      placeholder="Street, city, region"
                      value={form.homeAddress}
                      error={fieldErrors.homeAddress || addressError}
                      onChange={(e) => {
                        clearFieldError("homeAddress");
                        setAddressError("");
                        patch({ homeAddress: e.target.value });
                      }}
                      autoComplete="street-address"
                    />
                    {contactError && <p className="dap-error">{contactError}</p>}
                  </div>
                )}

                {step === 2 && <DriverExperienceStep form={form} patch={patch} />}

                {step === 3 && (
                  <div className="dap-review">
                    <div className="dap-review-block">
                      <h4>Position</h4>
                      <p>{positionLabel}</p>
                    </div>
                    <div className="dap-review-block">
                      <h4>Contact</h4>
                      <p>{form.firstName} {form.lastName}<br />{form.phone} · {form.email}<br />{formatHomeAddress(form.city, form.state, form.zip, form.homeAddress)}</p>
                    </div>
                    <div className="dap-review-block">
                      <h4>Experience</h4>
                      <p>CDL Class {form.cdlClass} · {form.yearsOTR} yrs commercial driving</p>
                    </div>
                    <div className="dap-review-block">
                      <h4>Files attached</h4>
                      <ul>
                        {[form.cdlFront, form.cdlBack, form.medicalCard, form.resume, form.referenceLetter]
                          .filter(Boolean)
                          .map((f) => <li key={f!.name}>{f!.name}</li>)}
                      </ul>
                    </div>

                    <div className="dap-review-driver">
                      <label className="dap-exp-field">
                        <span className="dap-exp-label">Date of birth *</span>
                        <input
                          className="dap-exp-input"
                          type="date"
                          value={form.dateOfBirth}
                          onChange={(e) => patch({ dateOfBirth: e.target.value })}
                        />
                      </label>
                    </div>

                    <label className="dap-field"><span>Additional notes</span><textarea rows={3} value={form.additionalNotes} onChange={(e) => patch({ additionalNotes: e.target.value })} /></label>
                    <div className="dap-exp-section">
                      <span className="dap-exp-label">Reference letter <em>(optional)</em></span>
                      <ExperienceFileBox
                        wide
                        icon={FileText}
                        title="Attach reference (optional)"
                        subtext="PDF, DOCX up to 10MB"
                        accept=".pdf,.doc,.docx"
                        file={form.referenceLetter}
                        onChange={(f) => patch({ referenceLetter: f })}
                      />
                    </div>
                    {status === "error" && <p className="dap-error">{error}</p>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {status !== "success" && (
          <footer className="dap-footer">
            <div className="dap-footer-meta">
              <span className="dap-page">{step + 1} / {STEPS.length}</span>
              {stepHint && <p className="dap-footer-hint">{stepHint}</p>}
            </div>
            <div className="dap-footer-actions">
              {step > 0 && (
                <button type="button" className="dap-btn dap-btn--ghost" onClick={() => setStep((s) => s - 1)} disabled={status === "submitting"}>
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="dap-btn dap-btn--primary" disabled={status === "submitting"} onClick={handleContinue}>
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="dap-btn dap-btn--primary"
                  disabled={status === "submitting"}
                  onClick={() => {
                    if (!canSubmit()) {
                      setStepHint("Date of birth is required to submit");
                      return;
                    }
                    setStepHint("");
                    void handleSubmit();
                  }}
                >
                  {status === "submitting" ? "Submitting…" : "Submit application →"}
                </button>
              )}
            </div>
          </footer>
        )}
      </motion.div>
    </div>
  );
}
