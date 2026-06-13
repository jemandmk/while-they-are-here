import { useId, useRef, useState } from "react";
import { WEEKLY_BEATS } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * The Standard Weekly Production Engine (SOP §3) as an accessible tablist.
 * Arrow keys move between tabs per the WAI-ARIA Authoring Practices.
 */
export function WeeklyLoop(): JSX.Element {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    let next = activeIndex;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % WEEKLY_BEATS.length;
    else if (event.key === "ArrowLeft") next = (activeIndex - 1 + WEEKLY_BEATS.length) % WEEKLY_BEATS.length;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="weekly" className="bg-linen-deep px-7 py-[11vh]">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          tag="The Standard Weekly Production Engine"
          title="A self-sustaining loop of presence."
          intro="Three beats a week — emotional narrative, academic grounding, and tangible action — so attention becomes a habit, not an event."
        />

        <Reveal>
          <div role="tablist" aria-label="Weekly loop" className="mt-[46px] flex flex-wrap gap-1.5 border-b border-hairline">
            {WEEKLY_BEATS.map((beat, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={beat.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`${baseId}-tab-${beat.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${beat.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onKeyDown}
                  className={
                    "focus-organic -mb-px border-b-2 px-[22px] py-4 text-[0.8rem] uppercase tracking-[0.14em] transition-colors duration-med " +
                    (selected ? "border-slate text-charcoal" : "border-transparent text-charcoal-soft hover:text-charcoal")
                  }
                >
                  <span className="mb-1 block font-serif text-[0.92rem] normal-case italic tracking-normal text-taupe-deep">
                    {beat.day}
                  </span>
                  {beat.vehicle}
                </button>
              );
            })}
          </div>
        </Reveal>

        {WEEKLY_BEATS.map((beat, index) => {
          const selected = index === activeIndex;
          return (
            <div
              key={beat.id}
              id={`${baseId}-panel-${beat.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${beat.id}`}
              hidden={!selected}
              className={selected ? "block pb-1 pt-11 motion-safe:animate-fadeUp" : "hidden"}
            >
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="mb-[18px] text-[0.78rem] uppercase tracking-[0.22em] text-taupe-deep">{beat.pillar}</p>
                  <h3 className="mb-1.5 text-3xl">{beat.vehicle}</h3>
                </div>
                <div>
                  <p className="mb-[18px] font-light text-charcoal-soft">{beat.concept}</p>
                  <div className="border-l-2 border-taupe py-1.5 pl-5">
                    <span className="mb-1.5 block text-[0.74rem] uppercase tracking-[0.16em] text-slate">
                      Technical Directive
                    </span>
                    {beat.directive}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
