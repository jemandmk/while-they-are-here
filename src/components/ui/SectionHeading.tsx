import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  readonly tag: string;
  readonly title: string;
  readonly intro?: string;
  /** Invert colours for use on the dark slate Check-In section. */
  readonly onDark?: boolean;
}

/** Consistent eyebrow + serif title + intro used by every major section. */
export function SectionHeading({
  tag,
  title,
  intro,
  onDark = false,
}: SectionHeadingProps): JSX.Element {
  const tagColor = onDark ? "text-taupe" : "text-taupe-deep";
  const titleColor = onDark ? "text-linen" : "text-charcoal";
  const introColor = onDark ? "text-linen/80" : "text-charcoal-soft";

  return (
    <div>
      <Reveal as="p" className={`mb-4 text-xs uppercase tracking-[0.3em] ${tagColor}`}>
        {tag}
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        className={`mb-5 max-w-[18ch] text-3xl leading-tight sm:text-4xl md:text-[2.7rem] ${titleColor}`}
      >
        {title}
      </Reveal>
      {intro ? (
        <Reveal as="p" delay={0.1} className={`max-w-[60ch] text-base font-light ${introColor}`}>
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
