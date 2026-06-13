import { useState } from "react";
import type { HowToItem } from "../../types";

interface AccordionProps {
  readonly items: ReadonlyArray<HowToItem>;
}

/** Minimalist, single-open accordion for "The Idea" tab's how-to list. */
export function Accordion({ items }: AccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-mist border-y border-mist">
      {items.map((item) => {
        const isOpen = item.id === openId;
        const panelId = `how-to-panel-${item.id}`;
        const buttonId = `how-to-button-${item.id}`;
        return (
          <div key={item.id}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="focus-organic flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-charcoal sm:text-lg">{item.title}</span>
              <span
                aria-hidden="true"
                className={
                  "flex-none text-xl leading-none text-walnut transition-transform duration-med ease-organic " +
                  (isOpen ? "rotate-45" : "rotate-0")
                }
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="overflow-hidden pb-6"
            >
              <p className="max-w-[60ch] text-sm font-light leading-relaxed text-charcoal/80 sm:text-base">
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
