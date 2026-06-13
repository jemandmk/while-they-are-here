import { useCallback, useId, useMemo, useState } from "react";
import { REMINDER_COPY } from "../../data/content";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { LogEntry, TimeOfDay } from "../../types";
import { Button } from "../ui/Button";

/** Before 6pm counts as "day"; 6pm onward counts as "night". */
function detectTimeOfDay(): TimeOfDay {
  return new Date().getHours() < 18 ? "day" : "night";
}

/**
 * "The Reminder" — a single state that auto-detects morning vs. evening, with
 * a manual override toggle, plus a tiny local log for the day's intention or
 * the night's gratitude.
 */
export function ReminderTab(): JSX.Element {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(detectTimeOfDay);
  const [draft, setDraft] = useState("");
  const [entries, setEntries] = useLocalStorage<ReadonlyArray<LogEntry>>("wth.reminder.log", []);
  const [savedJustNow, setSavedJustNow] = useState(false);
  const inputId = useId();

  const copy = REMINDER_COPY[timeOfDay];
  const isDay = timeOfDay === "day";

  const recentEntries = useMemo(
    () => entries.filter((entry) => entry.timeOfDay === timeOfDay).slice(0, 3),
    [entries, timeOfDay],
  );

  const onSave = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const entry: LogEntry = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      timeOfDay,
      text,
    };
    setEntries((prev) => [entry, ...prev].slice(0, 20));
    setDraft("");
    setSavedJustNow(true);
    window.setTimeout(() => setSavedJustNow(false), 2200);
  }, [draft, timeOfDay, setEntries]);

  return (
    <div className="mx-auto max-w-[60ch] animate-fadeUp px-6 py-16 text-center sm:py-24">
      <div className="mb-10 flex justify-center">
        <div role="group" aria-label="Time of day" className="inline-flex rounded-full border border-mist p-1">
          <button
            type="button"
            aria-pressed={isDay}
            onClick={() => setTimeOfDay("day")}
            className={
              "focus-organic rounded-full px-5 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-med " +
              (isDay ? "bg-sage text-charcoal" : "text-charcoal/50 hover:text-charcoal")
            }
          >
            Morning
          </button>
          <button
            type="button"
            aria-pressed={!isDay}
            onClick={() => setTimeOfDay("night")}
            className={
              "focus-organic rounded-full px-5 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-med " +
              (!isDay ? "bg-walnut text-cream" : "text-charcoal/50 hover:text-charcoal")
            }
          >
            Evening
          </button>
        </div>
      </div>

      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-clay">{copy.eyebrow}</p>
      <h1 className="mb-6 text-3xl leading-tight sm:text-4xl">{copy.title}</h1>
      <p className="mx-auto mb-10 max-w-[54ch] text-base font-light leading-relaxed text-charcoal/80">
        {copy.body}
      </p>

      <form onSubmit={onSave} className="mx-auto flex max-w-[46ch] flex-col items-stretch gap-4 text-left">
        <label htmlFor={inputId} className="text-xs uppercase tracking-[0.18em] text-charcoal/70">
          {copy.inputLabel}
        </label>
        <textarea
          id={inputId}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={copy.inputPlaceholder}
          rows={3}
          className="focus-organic w-full resize-none rounded-sm border border-mist bg-cream/60 p-4 font-sans text-sm text-charcoal placeholder:text-charcoal/40"
        />
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={!draft.trim()}>
            {copy.actionLabel}
          </Button>
          <span aria-live="polite" className="text-xs italic text-charcoal/60">
            {savedJustNow ? "Saved." : ""}
          </span>
        </div>
      </form>

      {recentEntries.length > 0 ? (
        <ul className="mx-auto mt-10 max-w-[46ch] space-y-3 text-left">
          {recentEntries.map((entry) => (
            <li key={entry.id} className="rounded-sm border border-mist bg-mist/30 p-4 text-sm font-light text-charcoal/80">
              <span className="mr-2 text-xs uppercase tracking-[0.16em] text-walnut">
                {new Date(entry.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>
              {entry.text}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
