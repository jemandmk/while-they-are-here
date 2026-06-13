import type { SensoryAnchorId } from "../../types";

const STROKE_PROPS = {
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Decorative anchor glyphs for the sensory dashboard. */
export function AnchorIcon({
  anchor,
  className = "h-9 w-9 stroke-slate-deep",
}: {
  anchor: SensoryAnchorId;
  className?: string;
}): JSX.Element {
  switch (anchor) {
    case "olfactory":
      return (
        <svg viewBox="0 0 24 24" className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M12 21c-3 0-5-2-5-5 0-2 1-3 1-5a4 4 0 1 1 8 0c0 2 1 3 1 5 0 3-2 5-5 5Z" />
          <path d="M9 11c1 1 5 1 6 0" />
        </svg>
      );
    case "voice":
      return (
        <svg viewBox="0 0 24 24" className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M4 12h2l2-5 3 11 3-14 2 8h4" />
        </svg>
      );
    case "texture":
      return (
        <svg viewBox="0 0 24 24" className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M5 13c2-1 3-1 5 0s3 1 5 0 3-1 5 0" />
          <path d="M5 17c2-1 3-1 5 0s3 1 5 0 3-1 5 0" />
          <path d="M7 9c1.5-.7 2.5-.7 4 0" />
        </svg>
      );
  }
}

export function CheckIcon({ className = "h-3 w-3" }: { className?: string }): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

export function MicIcon({ className = "h-4 w-4" }: { className?: string }): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className={className} {...STROKE_PROPS} strokeWidth={1.8} aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v4" />
    </svg>
  );
}
