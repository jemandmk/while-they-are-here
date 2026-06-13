import { useCallback, useState } from "react";
import { REFLECTION_PROMPTS } from "../data/content";
import { usePromptRoulette } from "../hooks/usePromptRoulette";
import { Button } from "./ui/Button";
import { CaptureChecklist } from "./CaptureChecklist";

/**
 * Feature B — the "Archive Prompt" Roulette plus the Capture Checklist.
 *
 * Draw logic lives in `usePromptRoulette`; this component renders the card,
 * handles clipboard copy, and composes the checklist beside it.
 */
export function PromptRoulette(): JSX.Element {
  const { current, isSwapping, draw } = usePromptRoulette(REFLECTION_PROMPTS);
  const [copyLabel, setCopyLabel] = useState("Copy assignment");

  const copy = useCallback(async (): Promise<void> => {
    const text = `${current.text}  — While They're Here (${current.pillar})`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Graceful fallback for browsers without async clipboard access.
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(area);
      }
    }
    setCopyLabel("Copied ✓");
    window.setTimeout(() => setCopyLabel("Copy assignment"), 1600);
  }, [current]);

  return (
    <div className="mt-12 grid grid-cols-1 items-start gap-11 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <article className="relative flex min-h-[320px] flex-col rounded border border-hairline bg-[#fffdf9] p-9 shadow-[0_24px_60px_-42px_rgba(46,43,38,0.5)]">
          <p className="mb-4 text-[0.72rem] uppercase tracking-[0.26em] text-taupe-deep">Archive Assignment</p>
          <p className="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-slate" aria-live="polite">
            {current.pillar}
          </p>
          <p
            className={
              "flex-1 font-serif text-2xl leading-[1.42] text-charcoal transition-all duration-med ease-organic md:text-[1.7rem] " +
              (isSwapping ? "translate-y-2.5 opacity-0" : "translate-y-0 opacity-100")
            }
          >
            {current.text}
          </p>
          <p className="mt-6 text-sm italic text-charcoal-soft">Field directive · 5 minutes · this weekend</p>
        </article>

        <div className="mt-7 flex flex-wrap gap-3.5">
          <Button withDot onClick={draw}>
            Draw a Reflection
          </Button>
          <Button variant="ghost" onClick={() => void copy()}>
            {copyLabel}
          </Button>
        </div>
      </div>

      <CaptureChecklist />
    </div>
  );
}
