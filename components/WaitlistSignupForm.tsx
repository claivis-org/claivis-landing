"use client";

import { FormEvent, useMemo, useState } from "react";

type WaitlistStatus = "idle" | "submitting" | "success" | "error";

type WaitlistFormState = {
  full_name: string;
  school_name: string;
  email: string;
  phone: string;
};

type WaitlistField = {
  key: keyof WaitlistFormState;
  label: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: "email" | "tel";
  type?: "email" | "tel" | "text";
  icon: "user" | "school" | "mail" | "phone";
};

const initialForm: WaitlistFormState = {
  full_name: "",
  school_name: "",
  email: "",
  phone: "",
};

const fields: WaitlistField[] = [
  {
    key: "full_name",
    label: "Your name",
    placeholder: "Ade Kunle",
    autoComplete: "name",
    type: "text",
    icon: "user",
  },
  {
    key: "school_name",
    label: "School name",
    placeholder: "Your school",
    autoComplete: "organization",
    type: "text",
    icon: "school",
  },
  {
    key: "email",
    label: "School email",
    placeholder: "you@school.com",
    autoComplete: "email",
    inputMode: "email",
    type: "email",
    icon: "mail",
  },
  {
    key: "phone",
    label: "Phone number",
    placeholder: "070...",
    autoComplete: "tel",
    inputMode: "tel",
    type: "tel",
    icon: "phone",
  },
];

function FieldIcon({ name }: { name: WaitlistField["icon"] }) {
  if (name === "school") {
    return (
      <svg className="h-4 w-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 21V9l8-4 8 4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-7h6v7M8 11h.01M12 11h.01M16 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg className="h-4 w-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg className="h-4 w-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8.91 10.73a16 16 0 0 0 4.36 4.36l1.29-1.29a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
    </svg>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function isValidPhone(phone: string) {
  // Allow optional leading +, digits, spaces, dashes, min 7 digits
  const cleaned = phone.replace(/[^0-9]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15;
}

function getFieldError(field: WaitlistField, value: string) {
  if (!value.trim()) {
    return `${field.label} is required.`;
  }

  if (field.key === "email" && !isValidEmail(value.trim())) {
    return "Please enter a valid school email.";
  }

  if (field.key === "phone" && !isValidPhone(value.trim())) {
    return "Please enter a valid phone number.";
  }

  return "";
}

export function WaitlistSignupForm() {
  const [form, setForm] = useState<WaitlistFormState>(initialForm);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [notice, setNotice] = useState("");

  const currentField = fields[step];
  const isLastStep = step === fields.length - 1;

  const canSubmit = useMemo(() => {
    return Boolean(
      form.full_name.trim() &&
        form.email.trim() &&
        form.school_name.trim() &&
        form.phone.trim() &&
        isValidEmail(form.email.trim()) &&
        isValidPhone(form.phone.trim()) &&
        status !== "submitting",
    );
  }, [form, status]);

  function updateField(field: keyof WaitlistFormState, value: string) {
    let sanitizedValue = value;
    if (field === "phone") {
      // Allow only numbers, +, space, and dashes
      sanitizedValue = value.replace(/[^0-9+\s-]/g, "");
    }

    setForm((current) => ({ ...current, [field]: sanitizedValue }));
    if (status === "error") {
      setStatus("idle");
      setNotice("");
    }
  }

  function goBack() {
    setNotice("");
    setStatus("idle");
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldError = getFieldError(currentField, form[currentField.key]);

    if (fieldError) {
      setStatus("error");
      setNotice(fieldError);
      return;
    }

    if (!isLastStep) {
      setStatus("idle");
      setNotice("");
      setStep((current) => current + 1);
      return;
    }

    if (!canSubmit) {
      setStatus("error");
      setNotice("Please complete your name, school, email, and phone number.");
      return;
    }

    setStatus("submitting");
    setNotice("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        error?: { message?: string };
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error?.message || payload.message || "Unable to join the waitlist.");
      }

      setStatus("success");
      setNotice("You are on the Claivis waitlist. We will reach out with next steps.");
      setForm(initialForm);
      setStep(0);
    } catch (error) {
      setStatus("error");
      setNotice(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
          Step {step + 1} of {fields.length}
        </span>
        <div className="flex gap-1.5">
          {fields.map((field, index) => (
            <span
              key={field.key}
              className={`h-1.5 rounded-full transition-all ${
                index === step ? "w-7 bg-white" : index < step ? "w-3 bg-white/55" : "w-3 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <label className="block text-left">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
          {currentField.label}
        </span>
        <div className="flex items-center gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
              aria-label="Go back"
            >
              <ArrowIcon direction="left" />
            </button>
          ) : null}

          <span className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 text-white shadow-sm transition-colors focus-within:border-white/55">
            <FieldIcon name={currentField.icon} />
            <input
              key={currentField.key}
              type={currentField.type || "text"}
              inputMode={currentField.inputMode}
              value={form[currentField.key]}
              onChange={(event) => updateField(currentField.key, event.target.value)}
              placeholder={currentField.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-white/35"
              autoComplete={currentField.autoComplete}
              autoFocus
            />
          </span>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex h-12 shrink-0 items-center gap-3 rounded-full border border-white bg-white py-1 pl-4 pr-1 text-blue shadow-xl shadow-black/20 transition hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="hidden text-[11px] font-bold uppercase tracking-widest sm:inline">
              {status === "submitting" ? "Joining" : isLastStep ? "Join" : "Next"}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white transition-transform group-hover:translate-x-0.5">
              {status === "submitting" ? <SpinnerIcon /> : <ArrowIcon />}
            </span>
          </button>
        </div>
      </label>

      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
            status === "success"
              ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-50"
              : "border-red-300/40 bg-red-500/15 text-red-50"
          }`}
        >
          {notice}
        </div>
      ) : null}

      <p className="text-left text-[11px] leading-relaxed text-white/50">
        No spam. We will only contact you about Claivis pilot access.
      </p>
    </form>
  );
}
