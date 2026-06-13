import { useCallback, useState } from "react";
import type { ReflectionPrompt } from "../types";

interface UsePromptRoulette {
  readonly current: ReflectionPrompt;
  /** True briefly during the swap, to drive the fade transition. */
  readonly isSwapping: boolean;
  /** Draw a new, non-repeating prompt. */
  readonly draw: () => void;
}

const SWAP_MS = 320;

/**
 * Owns the roulette's draw logic: never repeats the current prompt and
 * exposes a short `isSwapping` window so the view can animate the change.
 */
export function usePromptRoulette(
  prompts: ReadonlyArray<ReflectionPrompt>,
): UsePromptRoulette {
  if (prompts.length === 0) {
    throw new Error("usePromptRoulette requires at least one prompt.");
  }

  const [index, setIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  const draw = useCallback((): void => {
    setIsSwapping(true);
    window.setTimeout(() => {
      setIndex((prev) => {
        if (prompts.length === 1) return prev;
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * prompts.length);
        }
        return next;
      });
      setIsSwapping(false);
    }, SWAP_MS);
  }, [prompts.length]);

  // `noUncheckedIndexedAccess` is on, so guard the lookup explicitly.
  const current = prompts[index] ?? prompts[0];
  if (!current) {
    throw new Error("Prompt index out of range.");
  }

  return { current, isSwapping, draw };
}
