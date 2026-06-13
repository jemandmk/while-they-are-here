import { useCallback, useMemo, useState } from "react";
import type { RouletteMode } from "../types";
import { REFLECTION_PROMPTS } from "../data/content";
import { COURAGE_COMMITMENT, DISCOMFORT_PROMPTS } from "./DiscomfortFramework";
import { usePromptRoulette } from "../hooks/usePromptRoulette";
import { Button } from "./ui/Button";
import { CaptureChecklist } from "./CaptureChecklist";

/**
 * Feature B — the "Archive Prompt" Roulette plus the Capture Checklist.
 *
 * Two psychological modes share one card. "Standard Prompts" draws gentle,
 * five-minute captures; "Seek Discomfort Mode" swaps in high-vulnerability,
 * high-friction assignments, recolors the card to warm taupe, and gates the
 * reveal behind an explicit Courage Commitment — the user must choose the hard
 * path on purpose before the prompt is shown.
 */
export function PromptRoulette(): JSX.Element {
  const [mode, setMode] = useState<RouletteMode>("standard");
  /** In discomfort mode, the prompt stays hidden until the user commits. */
  const [committed, setCommitted] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy assignment");

  const isDiscomfort = mode === "discomfort";
  const pool = useMemo(
    () => (isDiscomfort ? DISCOMFORT_PROMPTS : REFLECTION_PROMPTS),
    [isDiscomfort],
  );
  const { current, isSwapping, draw } = usePromptRoulette(pool);

  // The prompt is visible in standard mode, or once the user accepts in discomfort mode.
  const revealed = !isDiscomfort || committed;
  const friction = isDiscomfort
    ? DISCOMFORT_PROMPTS.find((p) => p.id === current.id)?.friction ?? null
    : null;

  const switchMode = useCallback((next: RouletteMode): void => {
    setMode(next);
    // Entering discomfort always re-arms the Courage Commitment gate.
    setCommitted(next === "standard");
  }, []);

  // Drawing a fresh high-friction prompt re-arms the gate, so each one earns its reveal.
  const drawNext = useCallback((): void => {
    draw();
    if (isDiscomfort) setCommitted(false);
  }, [draw, isDiscomfort]);

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
        <ModeToggle mode={mode} onChange={switchMode} />

        <article
          className={
            "relative mt-7 flex min-h-[320px] flex-col rounded border bg-[#fffdf9] p-9 " +
            "shadow-[0_24px_60px_-42px_rgba(46,43,38,0.5)] transition-colors duration-med ease-organic " +
            (isDiscomfort ? "border-[1.5px] border-taupe" : "border-hairline")
          }
        >
          {revealed ? (
            <>
              <p className="mb-4 text-[0.72rem] uppercase tracking-[0.26em] text-taupe-deep">
                {isDiscomfort ? "Seek Discomfort · High-friction" : "Archive Assignment"}
              </p>
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
              <p className="mt-6 text-sm italic text-charcoal-soft">
                {isDiscomfort && friction
                  ? friction
                  : "Field directive · 5 minutes · this weekend"}
              </p>
            </>
          ) : (
            <CourageCommitment onAccept={() => setCommitted(true)} />
          )}
        </article>

        {revealed ? (
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button withDot onClick={drawNext}>
              {isDiscomfort ? "Draw another hard one" : "Draw a Reflection"}
            </Button>
            <Button variant="ghost" onClick={() => void copy()}>
              {copyLabel}
            </Button>
          </div>
        ) : null}
      </div>

      <CaptureChecklist />
    </div>
  );
}

interface ModeToggleProps {
  readonly mode: RouletteMode;
  readonly onChange: (next: RouletteMode) => void;
}

/**
 * Minimalist segmented switch: "Standard Prompts" vs "Seek Discomfort Mode".
 * Implemented as an ARIA switch — Space/Enter toggle it, the active end is
 * announced, and reduced-motion users still get the state change.
 */
function ModeToggle({ mode, onChange }: ModeToggleProps): JSX.Element {
  const isDiscomfort = mode === "discomfort";
  return (
    <div className="flex items-center gap-3.5">
      <span
        id="roulette-mode-standard"
        className={
          "text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-med " +
          (isDiscomfort ? "text-charcoal-soft" : "text-charcoal")
        }
      >
        Standard Prompts
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDiscomfort}
        aria-label="Seek Discomfort Mode"
        aria-describedby="roulette-mode-standard roulette-mode-discomfort"
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
        id="roulette-mode-discomfort"
        className={
          "text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-med " +
          (isDiscomfort ? "text-taupe-deep" : "text-charcoal-soft")
        }
      >
        Seek Discomfort Mode
      </span>
    </div>
  );
}

interface CourageCommitmentProps {
  readonly onAccept: () => void;
}

/**
 * The Courage Commitment gate. The prompt is withheld until the user makes an
 * explicit, deliberate choice to face the awkwardness — naming the resistance
 * out loud is the whole intervention.
 */
function CourageCommitment({ onAccept }: CourageCommitmentProps): JSX.Element {
  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <p className="mb-4 text-[0.72rem] uppercase tracking-[0.26em] text-taupe-deep">
        {COURAGE_COMMITMENT.kicker}
      </p>
      <p className="mb-4 font-serif text-2xl leading-[1.42] text-charcoal md:text-[1.7rem]">
        {COURAGE_COMMITMENT.line}
      </p>
      <p className="mb-7 max-w-[46ch] text-sm font-light text-charcoal-soft">
        {COURAGE_COMMITMENT.sub}
      </p>
      <Button withDot onClick={onAccept}>
        {COURAGE_COMMITMENT.accept}
      </Button>
    </div>
  );
}
