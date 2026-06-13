import { PromptRoulette } from "../PromptRoulette";
import { SectionHeading } from "../ui/SectionHeading";

/** Feature B wrapper — the Field Manual roulette + checklist. */
export function ArchiveSection(): JSX.Element {
  return (
    <section id="archive" className="px-7 py-[11vh]">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          tag="The Field Manual"
          title="Draw a reflection. Capture it rawly."
          intro="A single, simple assignment — and a checklist to keep you from over-producing the moment into something sterile."
        />
        <PromptRoulette />
      </div>
    </section>
  );
}
