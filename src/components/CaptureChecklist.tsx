import { useCallback, useMemo, useState } from "react";
import { CHECKLIST } from "../data/content";
import { CheckIcon } from "./ui/icons";

/**
 * The Reusable Production Execution Checklist (SOP §5). Each row is an ARIA
 * checkbox — fully operable with Space/Enter — and feeds a progress meter.
 */
export function CaptureChecklist(): JSX.Element {
  const [checked, setChecked] = useState<ReadonlySet<string>>(new Set());

  const toggle = useCallback((id: string): void => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const { done, total, label, pct } = useMemo(() => {
    const d = checked.size;
    const t = CHECKLIST.length;
    return {
      done: d,
      total: t,
      pct: t === 0 ? 0 : Math.round((d / t) * 100),
      label: d === t ? "All clear — capture it rawly." : `${d} of ${t} anchored`,
    };
  }, [checked]);

  return (
    <div className="rounded border border-hairline bg-white/45 p-8">
      <h3 className="mb-1.5 text-2xl">Capture Checklist</h3>
      <p className="mb-6 text-sm font-light text-charcoal-soft">
        From the Reusable Production Execution Checklist — validate before you keep it.
      </p>

      <ul className="list-none">
        {CHECKLIST.map((item) => {
          const isDone = checked.has(item.id);
          return (
            <li key={item.id} className="border-t border-hairline last:border-b">
              <div
                role="checkbox"
                aria-checked={isDone}
                tabIndex={0}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    toggle(item.id);
                  }
                }}
                className="focus-organic flex cursor-pointer items-start gap-3.5 py-3.5"
              >
                <span
                  className={
                    "mt-0.5 grid h-[22px] w-[22px] flex-none place-items-center rounded-[3px] border-[1.5px] " +
                    "transition-colors duration-med ease-organic " +
                    (isDone ? "border-slate bg-slate" : "border-slate bg-transparent")
                  }
                >
                  <CheckIcon
                    className={`h-3 w-3 stroke-linen [stroke-width:3] transition-opacity duration-med ${isDone ? "opacity-100" : "opacity-0"}`}
                  />
                </span>
                <span
                  className={`text-[0.92rem] transition-colors duration-med ${isDone ? "text-charcoal-soft" : "text-charcoal"}`}
                >
                  <strong className="font-semibold">{item.label}.</strong> {item.description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[0.82rem] uppercase tracking-[0.06em] text-taupe-deep" aria-live="polite">
        {label}
      </p>
      <div
        className="mt-2.5 h-[3px] overflow-hidden rounded-sm bg-hairline"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <span
          className="block h-full bg-slate transition-[width] duration-slow ease-organic"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
