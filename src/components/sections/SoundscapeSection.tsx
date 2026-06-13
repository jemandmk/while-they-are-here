import { SensoryDashboard } from "../SensoryDashboard";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Feature A wrapper — section heading + the interactive dashboard. */
export function SoundscapeSection(): JSX.Element {
  return (
    <section id="soundscape" className="bg-gradient-to-b from-linen to-linen-deep px-7 py-[11vh]">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          tag="The Science · The Proust Effect Engine"
          title="The VIP Neurological Highway."
          intro="Sight and sound route first through the thalamus before reaching emotion. Smell bypasses it entirely — feeding straight into the amygdala and hippocampus. Touch each anchor below to feel what standard recordings ignore."
        />
        <SensoryDashboard />
        <Reveal as="p" className="mt-[18px] text-center text-sm italic text-charcoal-soft">
          Sound is generated live in your browser (no files) — a gentle stand-in for the raw ambient audio
          you&rsquo;d capture under Protocol Alpha. Use headphones for the full effect.
        </Reveal>
      </div>
    </section>
  );
}
