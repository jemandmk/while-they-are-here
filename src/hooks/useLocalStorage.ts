import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

/**
 * `useState` backed by `localStorage`. Reads are JSON-parsed once on mount;
 * writes are JSON-serialised on every change. Falls back silently to in-memory
 * state if storage is unavailable (e.g. private browsing).
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setAndPersist = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage unavailable — state still updates in memory.
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, setAndPersist];
}
