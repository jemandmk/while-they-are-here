import { Reveal } from "../ui/Reveal";

/** Closing vision statement and brand mark. */
export function Footer(): JSX.Element {
  return (
    <footer className="bg-linen px-7 pb-14 pt-[70px] text-center">
      <div className="mx-auto max-w-[1080px]">
        <Reveal
          as="p"
          className="mx-auto mb-[30px] max-w-[24ch] font-serif text-xl italic text-slate-deep sm:text-2xl"
        >
          &ldquo;We deploy our deepest attention now — while they are still here to hear them.&rdquo;
        </Reveal>
        <p className="mb-2.5 font-serif uppercase tracking-[0.1em] text-charcoal">While They&rsquo;re Here</p>
        <p className="text-sm font-light text-charcoal-soft">
          A reusable framework for Life Appreciation, Simple Things &amp; Raw Storytelling. ·{" "}
          <a href="#top" className="text-taupe-deep no-underline">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
