import type { ElementType, ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

interface RevealProps {
  readonly children: ReactNode;
  /** Render as a different semantic element (defaults to <div>). */
  readonly as?: ElementType;
  readonly className?: string;
  /** Stagger delay in seconds for sequential reveals. */
  readonly delay?: number;
}

/**
 * Wraps content in the scroll-reveal primitive. Purely presentational —
 * the observation logic lives in `useReveal`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: RevealProps): JSX.Element {
  const { ref, isVisible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-in={isVisible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
