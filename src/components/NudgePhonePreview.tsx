import { useMemo } from "react";
import type { Nudge } from "../types";
import { MicIcon } from "./ui/icons";

interface NudgePhonePreviewProps {
  /** The nudge to show, or null before the user has requested a preview. */
  readonly nudge: Nudge | null;
  /** Optional contact the preview is addressed to. */
  readonly contact?: string;
}

/** A device mockup that renders a "Human Check-In" push notification. */
export function NudgePhonePreview({ nudge, contact }: NudgePhonePreviewProps): JSX.Element {
  const clock = useMemo(() => {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }, []);

  const hint = nudge
    ? contact
      ? `Preview for ${contact}`
      : "Tap again for tomorrow's →"
    : 'Tap "Preview a Nudge" to see today\'s →';

  return (
    <div className="flex justify-center">
      <div className="w-[300px] max-w-full rounded-[38px] border border-linen/10 bg-[#14110d] p-3.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[26px] bg-[#0c0a08] px-4 pb-7 pt-5">
          <div className="mx-auto mb-5 mt-0.5 h-1.5 w-[110px] rounded bg-linen/20" />
          <div className="mb-6 text-center text-[0.78rem] tracking-[0.1em] text-linen/85">
            While They&rsquo;re Here
            <span className="mt-1 block font-serif text-5xl leading-none text-linen">{clock}</span>
          </div>

          <div
            className={
              "rounded-2xl bg-linen/95 p-[14px_15px] text-charcoal shadow-[0_10px_30px_-14px_rgba(0,0,0,0.7)] " +
              "transition-all duration-slow ease-organic " +
              (nudge ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3.5 opacity-0")
            }
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-slate">
                <MicIcon className="h-[15px] w-[15px] stroke-linen" />
              </span>
              <span className="flex-1 text-[0.72rem] font-semibold">Human Check-In</span>
              <span className="text-[0.68rem] text-[#8b857c]">now</span>
            </div>
            <p className="mb-0.5 text-[0.84rem] font-semibold">{nudge?.title ?? ""}</p>
            <p className="text-[0.83rem] leading-relaxed text-[#3f3a33]">{nudge?.body ?? ""}</p>
          </div>

          <p className="absolute inset-x-0 bottom-4 text-center text-[0.72rem] text-linen/35">{hint}</p>
        </div>
      </div>
    </div>
  );
}
