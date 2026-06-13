import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view (organic, slow fade-up).
 * Returns a ref to attach and a boolean to drive the `data-in` attribute.
 *
 * Respects `prefers-reduced-motion` by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -8% 0px",
): { ref: React.RefObject<T>; isVisible: boolean } {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}
