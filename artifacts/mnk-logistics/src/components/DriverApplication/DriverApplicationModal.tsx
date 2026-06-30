import { useState, useEffect, type ChangeEvent, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, Upload, Check, Truck, User, FileCheck, ClipboardList, Mail, Phone, MapPin, FileText, type LucideIcon } from "lucide-react";
import { useDriverApplication } from "../../context/DriverApplicationContext";
import { EMPTY_DRIVER_FORM, POSITIONS, type DriverApplicationForm } from "./types";
import { submitDriverApplication } from "./submit";
import { formatHomeAddress, parseHomeAddress } from "./parseAddress";

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
  ...props
}: {
  label: string;
  icon: LucideIcon;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`dap-icon-field ${className}`}>
      <span className="dap-icon-label">{label}</span>
      <div className="dap-icon-input-wrap">
        <Icon size={18} className="dap-icon-input-icon" aria-hidden="true" />
        <input className="dap-icon-input" {...props} />
      </div>
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

function DriverExperienceStep({
  form,
  patch,
}: {
  form: DriverApplicationForm;
  patch: (partial: Partial<DriverApplicationForm>) => void;
}) {
  return (
    <div className="dap-exp">
      <label className="dap-exp-select-wrap">
        <span className="dap-exp-sr">CDL type</span>
        <select
          className={`dap-exp-select ${form.cdlClass ? "dap-exp-select--filled" : ""}`}
          value={form.cdlClass}
          onChange={(e) => patch({ cdlClass: e.target.value as "A" | "B" | "" })}
        >
          <option value="">Select CDL Type…</option>
          <option value="A">Class A</option>
          <option value="B">Class B</option>
        </select>
        <ChevronDown size={18} className="dap-exp-select-chevron" aria-hidden="true" />
      </label>

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

  const patch = (partial: Partial<DriverApplicationForm>) => setForm((f) => ({ ...f, ...partial }));

  const reset = () => {
    setStep(0);
    setForm(EMPTY_DRIVER_FORM);
    setStatus("idle");
    setError("");
    setApplicationId("");
    setAddressError("");
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 300);
  };

  const isDriverRole = form.position === "company_driver" || form.position === "owner_operator";

  const canContinue = () => {
    if (step === 0) return !!form.position;
    if (step === 1) {
      return form.firstName && form.lastName && form.phone && form.email && form.homeAddress.trim();
    }
    if (step === 2) {
      if (isDriverRole) {
        return form.cdlClass && form.yearsOTR && form.cdlFront && form.cdlBack && form.medicalCard;
      }
      return form.yearsOTR.trim().length > 0;
    }
    return true;
  };

  const canSubmit = () => {
    if (isDriverRole) {
      return !!form.dateOfBirth && !!form.mvrReport;
    }
    return true;
  };

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

  const handleContinue = () => {
    if (step === 1) {
      const parsed = parseHomeAddress(form.homeAddress);
      if (!parsed) {
        setAddressError("Please enter your full address (at least 3 characters)");
        return;
      }
      setAddressError("");
      patch({ city: parsed.city, state: parsed.state, zip: parsed.zip });
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
                        <span className="dap-position-num">{p.id === "company_driver" ? "01" : p.id === "owner_operator" ? "02" : "03"}</span>
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
                        onChange={(e) => patch({ firstName: e.target.value })}
                        autoComplete="given-name"
                      />
                      <IconField
                        label="Last name"
                        icon={User}
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={(e) => patch({ lastName: e.target.value })}
                        autoComplete="family-name"
                      />
                    </div>
                    <IconField
                      label="Email address"
                      icon={Mail}
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => patch({ email: e.target.value })}
                      autoComplete="email"
                    />
                    <IconField
                      label="Phone number"
                      icon={Phone}
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => patch({ phone: e.target.value })}
                      autoComplete="tel"
                    />
                    <IconField
                      label="Home address"
                      icon={MapPin}
                      placeholder="Street, city, region"
                      value={form.homeAddress}
                      onChange={(e) => {
                        setAddressError("");
                        patch({ homeAddress: e.target.value });
                      }}
                      autoComplete="street-address"
                    />
                    {addressError && <p className="dap-error">{addressError}</p>}
                  </div>
                )}

                {step === 2 && isDriverRole && <DriverExperienceStep form={form} patch={patch} />}

                {step === 2 && !isDriverRole && (
                  <div className="dap-fields">
                    <label className="dap-field">
                      <span>Investment experience *</span>
                      <input placeholder="Years in trucking / logistics investment" value={form.yearsOTR} onChange={(e) => patch({ yearsOTR: e.target.value })} />
                    </label>
                    <label className="dap-field">
                      <span>Additional notes</span>
                      <textarea rows={4} placeholder="Tell us about your investment goals..." value={form.additionalNotes} onChange={(e) => patch({ additionalNotes: e.target.value })} />
                    </label>
                  </div>
                )}

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
                    {isDriverRole && (
                      <div className="dap-review-block">
                        <h4>Experience</h4>
                        <p>CDL Class {form.cdlClass} · {form.yearsOTR} yrs commercial driving</p>
                      </div>
                    )}
                    <div className="dap-review-block">
                      <h4>Files attached</h4>
                      <ul>
                        {[form.cdlFront, form.cdlBack, form.medicalCard, form.mvrReport, form.resume, form.referenceLetter]
                          .filter(Boolean)
                          .map((f) => <li key={f!.name}>{f!.name}</li>)}
                      </ul>
                    </div>

                    {isDriverRole && (
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
                        <div className="dap-exp-section">
                          <span className="dap-exp-label">MVR report *</span>
                          <ExperienceFileBox
                            wide
                            title="Upload MVR report"
                            subtext="PDF, JPG, PNG up to 10MB"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            file={form.mvrReport}
                            onChange={(f) => patch({ mvrReport: f })}
                          />
                        </div>
                      </div>
                    )}

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
            <span className="dap-page">{step + 1} / {STEPS.length}</span>
            <div className="dap-footer-actions">
              {step > 0 && (
                <button type="button" className="dap-btn dap-btn--ghost" onClick={() => setStep((s) => s - 1)} disabled={status === "submitting"}>
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="dap-btn dap-btn--primary" disabled={!canContinue()} onClick={handleContinue}>
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button type="button" className="dap-btn dap-btn--primary" disabled={status === "submitting" || !canSubmit()} onClick={handleSubmit}>
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
