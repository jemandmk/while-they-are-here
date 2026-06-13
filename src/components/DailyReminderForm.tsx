import { useCallback, useState } from "react";
import type { RouletteMode } from "../types";
import { DISCOMFORT_REMINDER } from "./DiscomfortFramework";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";

/**
 * The Daily Reminder subscription mockup. Users preview the kind of nudge
 * they'll receive — and can flip it to the "Seek Discomfort" variant, which
 * trades the gentle observation for an honest, high-friction prompt that names
 * the resistance and asks them to act through it anyway.
 *
 * The form is a non-submitting preview (no backend); it exists to communicate
 * the tone of the product, not to collect addresses yet.
 */
export function DailyReminderForm(): JSX.Element {
  const [variant, setVariant] = useState<RouletteMode>("standard");
  const isDiscomfort = variant === "discomfort";
  const preview = isDiscomfort ? DISCOMFORT_REMINDER.discomfort : DISCOMFORT_REMINDER.standard;

  // Preview only — never actually submits.
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  }, []);

  return (
    <section id="reminder" className="px-7 py-[11vh]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            tag="The Daily Reminder"
            title="One small nudge, every day."
            intro="A single line each morning to pull you back into the room. Choose the gentle version — or the one that makes you do the hard thing."
          />

          <ReminderVariantToggle variant={variant} onChange={setVariant} />

          <form onSubmit={onSubmit} className="mt-7 flex max-w-[420px] flex-wrap gap-3.5">
            <label htmlFor="reminder-email" className="sr-only">
              Email address for the daily reminder
            </label>
            <input
              id="reminder-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={
                "focus-organic min-w-[220px] flex-1 rounded-sm border border-hairline bg-[#fffdf9] " +
                "px-5 py-4 font-sans text-sm text-charcoal placeholder:text-charcoal-soft/60"
              }
            />
            <Button type="submit" withDot>
              Send me this daily
            </Button>
          </form>
          <p className="mt-3 text-[0.78rem] italic text-charcoal-soft">
            Preview only — nothing is sent yet.
          </p>
        </div>

        <ReminderPreview
          isDiscomfort={isDiscomfort}
          label={preview.label}
          body={preview.body}
        />
      </div>
    </section>
  );
}

interface ReminderVariantToggleProps {
  readonly variant: RouletteMode;
  readonly onChange: (next: RouletteMode) => void;
}

/** Segmented switch mirroring the roulette: Gentle vs Seek Discomfort. */
function ReminderVariantToggle({ variant, onChange }: ReminderVariantToggleProps): JSX.Element {
  const isDiscomfort = variant === "discomfort";
  return (
    <div className="mt-8 flex items-center gap-3.5">
      <span
        id="reminder-variant-standard"
        className={
          "text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-med " +
          (isDiscomfort ? "text-charcoal-soft" : "text-charcoal")
        }
      >
        Gentle
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDiscomfort}
        aria-label="Seek Discomfort reminder variant"
        aria-describedby="reminder-variant-standard reminder-variant-discomfort"
        onClick={() => onChange(isDiscomfort ? "standard" : "discomfort")}
        className={
          "focus-organic relative inline-flex h-6 w-12 flex-none items-center rounded-full " +
          "transition-colors duration-med ease-organic " +
          (isDiscomfort ? "bg-taupe" : "bg-hairline")
        }
      >
        <span
          className={
            "inline-block h-[18px] w-[18px] transform rounded-full bg-[#fffdf9] shadow-sm " +
            "transition-transform duration-med ease-organic " +
            (isDiscomfort ? "translate-x-[27px]" : "translate-x-[3px]")
          }
        />
      </button>
      <span
        id="reminder-variant-discomfort"
        className={
          "text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-med " +
          (isDiscomfort ? "text-taupe-deep" : "text-charcoal-soft")
        }
      >
        Seek Discomfort
      </span>
    </div>
  );
}

interface ReminderPreviewProps {
  readonly isDiscomfort: boolean;
  readonly label: string;
  readonly body: string;
}

/** A lock-screen-style notification banner that previews the chosen variant. */
function ReminderPreview({ isDiscomfort, label, body }: ReminderPreviewProps): JSX.Element {
  return (
    <div className="flex justify-center">
      <div
        className={
          "w-full max-w-[360px] rounded-[22px] border bg-[#fffdf9] p-5 " +
          "shadow-[0_30px_70px_-46px_rgba(46,43,38,0.55)] transition-colors duration-med ease-organic " +
          (isDiscomfort ? "border-[1.5px] border-taupe" : "border-hairline")
        }
      >
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className={
              "grid h-7 w-7 flex-none place-items-center rounded-[7px] text-[0.7rem] font-semibold text-linen " +
              (isDiscomfort ? "bg-taupe-deep" : "bg-slate")
            }
            aria-hidden="true"
          >
            WTH
          </span>
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-charcoal-soft">
            While They&rsquo;re Here
          </span>
          <span className="ml-auto text-[0.72rem] text-charcoal-soft">now</span>
        </div>
        <p
          className={
            "mb-1.5 text-[0.82rem] font-semibold " +
            (isDiscomfort ? "text-taupe-deep" : "text-charcoal")
          }
          aria-live="polite"
        >
          {label}
        </p>
        <p className="text-[0.95rem] font-light leading-[1.5] text-charcoal" aria-live="polite">
          {body}
        </p>
      </div>
    </div>
  );
}
