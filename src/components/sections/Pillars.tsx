import { PILLARS } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** The three foundational content pillars (SOP §1). */
export function Pillars(): JSX.Element {
  return (
    <section id="pillars" className="px-7 py-[11vh]">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          tag="The Foundation"
          title="Three pillars for archiving the people we love."
          intro="Every reflection here anchors into at least one of three foundations — moving us from retrospective grief toward present-tense gratitude."
        />
        <ul className="mt-[54px] grid list-none grid-cols-1 gap-[26px] md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal
              key={pillar.num}
              as="li"
              delay={index * 0.06}
              className="rounded border border-hairline bg-white/40 p-8 transition-all duration-med ease-organic hover:-translate-y-1 hover:border-taupe hover:bg-white/70"
            >
              <p className="font-serif text-lg italic text-taupe-deep">{pillar.num}</p>
              <h3 className="mb-3.5 mt-2.5 text-2xl">{pillar.name}</h3>
              <p className="text-sm font-light text-charcoal-soft">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
