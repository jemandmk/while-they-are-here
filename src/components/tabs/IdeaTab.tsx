import { HOW_TOS, IDEA_HEADLINE, IDEA_INTRO } from "../../data/content";
import { Accordion } from "../ui/Accordion";

/**
 * "The Idea" — the neuroplasticity reframe, plus a practical accordion of
 * how-to's for retraining attention toward the things that fade fastest.
 */
export function IdeaTab(): JSX.Element {
  return (
    <div className="mx-auto max-w-[68ch] animate-fadeUp px-6 py-16 sm:py-24">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-clay">
        Perspective · Neuroplasticity
      </p>
      <h1 className="mb-8 text-center text-2xl leading-snug sm:text-3xl md:text-[2.2rem]">
        {IDEA_HEADLINE}
      </h1>
      <p className="mx-auto mb-12 max-w-[60ch] text-center text-base font-light leading-relaxed text-charcoal/80">
        {IDEA_INTRO}
      </p>

      <h2 className="mb-2 text-center text-sm uppercase tracking-[0.2em] text-walnut">
        How to practice it
      </h2>
      <Accordion items={HOW_TOS} />
    </div>
  );
}
