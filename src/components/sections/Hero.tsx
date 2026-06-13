import { Reveal } from "../ui/Reveal";

/** Hero — the master vision statement and a single sensory-check-in CTA. */
export function Hero(): JSX.Element {
  return (
    <section id="hero" className="relative px-7 pb-[13vh] pt-[9vh] text-center">
      <div className="mx-auto max-w-[760px]">
        <Reveal as="p" className="mb-[30px] text-[0.78rem] uppercase tracking-[0.32em] text-taupe-deep">
          A living archive · not a highlight reel
        </Reveal>
        <Reveal
          as="h1"
          delay={0.05}
          className="mx-auto mb-[26px] max-w-[13ch] text-[2.4rem] sm:text-5xl md:text-[4.4rem]"
        >
          Capturing the ordinary <em className="italic text-slate">before it becomes extraordinary.</em>
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mb-[18px] max-w-[56ch] text-lg font-light text-charcoal-soft"
        >
          We don&rsquo;t save our best words, deepest attention, or archival efforts for a funeral. We deploy
          them now — in real time — while they are still here to hear them.
        </Reveal>
        <Reveal
          as="p"
          delay={0.15}
          className="mx-auto mb-[42px] max-w-[50ch] text-base font-light italic text-charcoal-soft"
        >
          A quiet practice for feeling human again, and grounding yourself in the people you love.
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="#soundscape"
            className={
              "inline-flex items-center gap-3 rounded-sm border border-slate bg-slate px-[30px] py-4 " +
              "text-sm uppercase tracking-[0.06em] text-linen no-underline transition-all duration-med ease-organic " +
              "focus-organic hover:-translate-y-0.5 hover:bg-slate-deep hover:tracking-[0.09em]"
            }
          >
            <span className="h-[7px] w-[7px] rounded-full bg-taupe" aria-hidden="true" />
            Start a sensory check-in
          </a>
        </Reveal>
      </div>
    </section>
  );
}
