import { useCallback, useId, useMemo, useState } from "react";
import { NUDGES } from "../data/content";
import type { ContactMethod, Nudge, SubscriptionStatus } from "../types";
import { Button } from "./ui/Button";
import { NudgePhonePreview } from "./NudgePhonePreview";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(method: ContactMethod, raw: string): boolean {
  const value = raw.trim();
  if (method === "email") return EMAIL_RE.test(value);
  return value.replace(/\D/g, "").length >= 7;
}

/**
 * Feature C — the Daily "Human Check-In" subscription module.
 *
 * Uses a discriminated `SubscriptionStatus` union rather than scattered
 * booleans, and a placeholder submit handler (no real backend call). The phone
 * preview is a sibling presentational component.
 */
export function DailyReminderForm(): JSX.Element {
  const fieldId = useId();
  const [method, setMethod] = useState<ContactMethod>("email");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<SubscriptionStatus>({ kind: "idle" });
  const [nudgeIndex, setNudgeIndex] = useState<number | null>(null);

  const previewNudge: Nudge | null = useMemo(
    () => (nudgeIndex === null ? null : (NUDGES[nudgeIndex] ?? null)),
    [nudgeIndex],
  );

  const switchMethod = useCallback((next: ContactMethod): void => {
    setMethod(next);
    setContact("");
    setStatus({ kind: "idle" });
  }, []);

  const showNextNudge = useCallback((): void => {
    setNudgeIndex((prev) => {
      const start = prev === null ? -1 : prev;
      return (start + 1) % NUDGES.length;
    });
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (!validate(method, contact)) {
        setStatus({
          kind: "invalid",
          message:
            method === "email"
              ? "Please enter a valid email."
              : "Please enter a valid phone number.",
        });
        return;
      }
      // Placeholder backend logic — no real submission is performed.
      setStatus({ kind: "subscribed", contact: contact.trim() });
      showNextNudge();
    },
    [method, contact, showNextNudge],
  );

  const note =
    status.kind === "invalid"
      ? status.message
      : status.kind === "subscribed"
        ? "You're in. Your first Human Check-In arrives tomorrow morning. (Simulated — nothing was sent.)"
        : "";

  return (
    <div className="mt-12 grid grid-cols-1 items-center gap-[54px] md:grid-cols-2">
      <form noValidate onSubmit={handleSubmit} className="font-sans">
        <div
          className="inline-flex overflow-hidden rounded-sm border border-linen/25"
          role="group"
          aria-label="Choose contact method"
        >
          {(["email", "phone"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={method === option}
              onClick={() => switchMethod(option)}
              className={
                "px-[18px] py-[9px] text-[0.78rem] uppercase tracking-[0.08em] transition-colors duration-med " +
                (method === option ? "bg-linen/12 text-linen" : "text-linen/70 hover:text-linen")
              }
            >
              {option === "email" ? "Email" : "Phone"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor={fieldId} className="text-[0.74rem] uppercase tracking-[0.16em] text-taupe">
            {method === "email" ? "Your email" : "Your phone number"}
          </label>
          <div className="mt-2.5 flex flex-wrap gap-3">
            <input
              id={fieldId}
              name="contact"
              type={method === "email" ? "email" : "tel"}
              inputMode={method === "email" ? "email" : "tel"}
              autoComplete={method === "email" ? "email" : "tel"}
              placeholder={method === "email" ? "you@example.com" : "(555) 012-3456"}
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              aria-invalid={status.kind === "invalid"}
              aria-describedby={`${fieldId}-note`}
              className={
                "min-w-[220px] flex-1 rounded-sm border border-linen/30 bg-linen/[0.06] px-[18px] py-[15px] " +
                "font-sans text-base text-linen placeholder:text-linen/45 transition-colors duration-med " +
                "focus:border-taupe focus:bg-linen/10 focus:outline-none"
              }
            />
          </div>
        </div>

        <div className="mt-[18px] flex flex-wrap gap-3.5">
          <Button
            type="submit"
            withDot
            className="border-taupe bg-taupe !text-charcoal hover:border-taupe-deep hover:bg-taupe-deep hover:!text-linen"
          >
            Subscribe
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={showNextNudge}
            className="border-linen/40 !text-linen hover:bg-linen/10"
          >
            Preview a Nudge
          </Button>
        </div>

        <p id={`${fieldId}-note`} role="status" className="mt-3.5 min-h-[1.2em] text-sm text-taupe">
          {note}
        </p>
        <p className="mt-4 max-w-[44ch] text-[0.78rem] font-light text-linen/60">
          A simulated sign-up — no message is actually sent. Backend submission is left as placeholder
          logic. One nudge a day; pause or leave anytime.
        </p>
      </form>

      <NudgePhonePreview
        nudge={previewNudge}
        {...(status.kind === "subscribed" && contact.trim()
          ? { contact: contact.trim() }
          : {})}
      />
    </div>
  );
}
