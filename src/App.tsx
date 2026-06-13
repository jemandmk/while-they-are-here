import { useState } from "react";
import { TabNav } from "./components/TabNav";
import { ReminderTab } from "./components/tabs/ReminderTab";
import { IdeaTab } from "./components/tabs/IdeaTab";
import { OpenLetterTab } from "./components/tabs/OpenLetterTab";
import type { TabId } from "./types";

/**
 * Root composition. A single, distraction-free surface with exactly three
 * tabs — Reminder, Idea, Open Letter — and nothing else.
 */
export function App(): JSX.Element {
  const [active, setActive] = useState<TabId>("reminder");

  return (
    <div className="min-h-screen">
      <header className="px-6 pt-10 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-walnut">While They&rsquo;re Here</p>
      </header>

      <nav className="mt-8 px-6">
        <TabNav active={active} onChange={setActive} />
      </nav>

      <main>
        <section role="tabpanel" id="panel-reminder" aria-labelledby="tab-reminder" hidden={active !== "reminder"}>
          <ReminderTab />
        </section>
        <section role="tabpanel" id="panel-idea" aria-labelledby="tab-idea" hidden={active !== "idea"}>
          <IdeaTab />
        </section>
        <section role="tabpanel" id="panel-letter" aria-labelledby="tab-letter" hidden={active !== "letter"}>
          <OpenLetterTab />
        </section>
      </main>

      <footer className="px-6 py-10 text-center text-xs text-charcoal/50">
        Capturing the ordinary before it becomes extraordinary.
      </footer>
    </div>
  );
}
