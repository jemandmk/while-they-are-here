import { useCallback, useEffect, useRef, useState } from "react";
import { SensoryAudioEngine } from "../lib/audioEngine";
import type { SensoryAnchorId } from "../types";

interface UseSensoryAudio {
  /** The anchor currently sounding, or null when silent. */
  readonly activeAnchor: SensoryAnchorId | null;
  /** Toggle an anchor on/off. Honours reduced-motion (visual-only) preference. */
  readonly toggle: (anchor: SensoryAnchorId) => void;
  /** Force-stop all audio (e.g. when the tab is hidden). */
  readonly stop: () => void;
}

/**
 * Adapts the framework-agnostic `SensoryAudioEngine` to React lifecycle:
 * owns a stable engine instance, tracks the active anchor, and tears the
 * engine down on unmount and tab-hide.
 */
export function useSensoryAudio(): UseSensoryAudio {
  const engineRef = useRef<SensoryAudioEngine | null>(null);
  const [activeAnchor, setActiveAnchor] = useState<SensoryAnchorId | null>(null);

  const getEngine = useCallback((): SensoryAudioEngine => {
    if (engineRef.current === null) {
      engineRef.current = new SensoryAudioEngine();
    }
    return engineRef.current;
  }, []);

  const stop = useCallback((): void => {
    engineRef.current?.stop();
    setActiveAnchor(null);
  }, []);

  const toggle = useCallback(
    (anchor: SensoryAnchorId): void => {
      setActiveAnchor((current) => {
        const engine = getEngine();
        if (current === anchor) {
          engine.stop();
          return null;
        }
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (!prefersReduced) {
          engine.play(anchor);
        } else {
          engine.stop();
        }
        return anchor;
      });
    },
    [getEngine],
  );

  useEffect(() => {
    const onVisibility = (): void => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [stop]);

  return { activeAnchor, toggle, stop };
}
