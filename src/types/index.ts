/**
 * Domain types for "While They're Here".
 *
 * These are the single source of truth for every interactive data state in
 * the app. `any` is never permitted; prefer string-literal unions and
 * `readonly` structures so content data cannot be mutated at runtime.
 */

/** The three top-level tabs of the hyper-minimalist interface. */
export type TabId = "reminder" | "idea" | "letter";

/** Which variant of "The Reminder" is showing. */
export type TimeOfDay = "day" | "night";

/** Static copy for one time-of-day state of "The Reminder". */
export interface ReminderCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  /** Prompt shown above the input for that time of day. */
  readonly inputLabel: string;
  readonly inputPlaceholder: string;
  /** Label for the action button beneath the input. */
  readonly actionLabel: string;
}

/** A single saved entry in the gratitude / intention log. */
export interface LogEntry {
  readonly id: string;
  /** ISO 8601 timestamp. */
  readonly date: string;
  readonly timeOfDay: TimeOfDay;
  readonly text: string;
}

/** One collapsible "how-to" item in The Idea tab. */
export interface HowToItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}
