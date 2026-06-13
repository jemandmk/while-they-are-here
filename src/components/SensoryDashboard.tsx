import { useMemo } from "react";
import { SENSORY_ANCHORS } from "../data/content";
import { useSensoryAudio } from "../hooks/useSensoryAudio";
import type { SensoryAnchor } from "../types";
import { AnchorIcon } from "./ui/icons";

const DEFAULT_READOUT = {
  title: "The Core Dichotomy of Human Sensory Loss",
  body: "Choose an anchor — each one plays a soft, synthesized ambient murmur and a prompt for what to capture before it disappears.",
} as const;

/**
 * Feature A — the Proustian interactive soundscape ("VIP Neurological Highway").
 *
 * Floating, keyboard-navigable nodes trigger live-synthesised ambient audio and
 * reveal the manual's sensory-loss copy. Audio logic is fully delegated to the
 * `useSensoryAudio` hook; this component only renders.
 */
export function SensoryDashboard(): JSX.Element {
  const { activeAnchor, toggle } = useSensoryAudio();

  const readout = useMemo(() => {
    const anchor = SENSORY_ANCHORS.find((a) => a.id === activeAnchor);
    return anchor ?? DEFAULT_READOUT;
  }, [activeAnchor]);

  return (
    <div
      className="relative mt-12 min-h-[460px] overflow-hidden rounded border border-hairline bg-charcoal/[0.015] max-md:min-h-0 max-md:pb-6"
      role="group"
      aria-label="Interactive memory soundscape"
    >
      <p className="absolute inset-x-0 top-6 text-center text-xs uppercase tracking-[0.16em] text-charcoal-soft/70 max-md:static max-md:mb-2 max-md:mt-5">
        {activeAnchor ? "Tap again to quiet it" : "Tap an anchor to listen"}
      </p>

      {SENSORY_ANCHORS.map((anchor) => (
        <AnchorNode
          key={anchor.id}
          anchor={anchor}
          isPlaying={activeAnchor === anchor.id}
          onToggle={() => toggle(anchor.id)}
        />
      ))}

      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-linen-deep/95 via-linen-deep/60 to-transparent px-8 pb-7 pt-10 max-md:static max-md:bg-none max-md:p-6"
        aria-live="polite"
      >
        <p className="min-h-[1.4em] font-serif text-lg italic text-slate-deep">{readout.title}</p>
        <p className="mt-1.5 max-w-[62ch] text-sm font-light text-charcoal-soft">{readout.body}</p>
      </div>
    </div>
  );
}

interface AnchorNodeProps {
  readonly anchor: SensoryAnchor;
  readonly isPlaying: boolean;
  readonly onToggle: () => void;
}

function AnchorNode({ anchor, isPlaying, onToggle }: AnchorNodeProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={`${anchor.label}. ${anchor.kicker}. ${isPlaying ? "Playing — activate to stop." : "Activate to play its ambient sound."}`}
      className={
        "group absolute z-[3] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 " +
        "focus-organic max-md:static max-md:w-full max-md:translate-x-0 max-md:translate-y-0 " +
        "max-md:flex-row max-md:gap-[18px] max-md:border-b max-md:border-hairline max-md:px-6 max-md:py-5"
      }
      style={{ left: `${anchor.position.leftPct}%`, top: `${anchor.position.topPct}%` }}
    >
      <span
        className={
          "relative grid h-24 w-24 place-items-center rounded-full border border-slate/35 " +
          "transition-all duration-med ease-organic motion-safe:animate-float " +
          "group-hover:scale-110 group-focus-visible:scale-110 max-md:h-16 max-md:w-16 max-md:animate-none " +
          (isPlaying
            ? "bg-[radial-gradient(circle_at_35%_30%,rgba(179,139,109,0.65),rgba(74,82,69,0.32)_70%)] shadow-[0_0_0_10px_rgba(179,139,109,0.10),0_0_44px_rgba(179,139,109,0.28)]"
            : "bg-[radial-gradient(circle_at_35%_30%,rgba(179,139,109,0.42),rgba(74,82,69,0.20)_70%)]")
        }
      >
        {isPlaying ? (
          <>
            <span className="pointer-events-none absolute inset-0 rounded-full border border-taupe motion-safe:animate-pulse" />
            <span className="pointer-events-none absolute inset-0 rounded-full border border-taupe motion-safe:animate-pulse [animation-delay:1.1s]" />
          </>
        ) : null}
        <AnchorIcon anchor={anchor.id} className="h-9 w-9 stroke-slate-deep max-md:h-6 max-md:w-6" />
      </span>
      <span className="font-serif text-base italic text-charcoal max-md:text-left">
        {anchor.label}
        <small className="mt-1 block font-sans text-[0.72rem] not-italic uppercase tracking-[0.16em] text-taupe-deep">
          {anchor.kicker}
        </small>
      </span>
    </button>
  );
}
