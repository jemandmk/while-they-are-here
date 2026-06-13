import { TABS } from "../data/content";
import type { TabId } from "../types";

interface TabNavProps {
  readonly active: TabId;
  readonly onChange: (next: TabId) => void;
}

/**
 * The entire navigation system: three tabs, ARIA tablist semantics, and
 * arrow-key navigation between them.
 */
export function TabNav({ active, onChange }: TabNavProps): JSX.Element {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const currentIndex = TABS.findIndex((tab) => tab.id === active);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + delta + TABS.length) % TABS.length;
      const next = TABS[nextIndex];
      if (next) onChange(next.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Sections"
      onKeyDown={onKeyDown}
      className="flex justify-center gap-2 border-b border-mist sm:gap-6"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={
              "focus-organic relative px-3 py-4 text-xs uppercase tracking-[0.18em] transition-colors duration-med sm:px-5 sm:text-sm " +
              (isActive ? "text-charcoal" : "text-charcoal/50 hover:text-charcoal")
            }
          >
            {tab.label}
            <span
              aria-hidden="true"
              className={
                "absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-clay transition-opacity duration-med sm:inset-x-5 " +
                (isActive ? "opacity-100" : "opacity-0")
              }
            />
          </button>
        );
      })}
    </div>
  );
}
