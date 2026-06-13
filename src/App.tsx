import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Pillars } from "./components/sections/Pillars";
import { SoundscapeSection } from "./components/sections/SoundscapeSection";
import { WeeklyLoop } from "./components/sections/WeeklyLoop";
import { ArchiveSection } from "./components/sections/ArchiveSection";
import { DailyReminderForm } from "./components/DailyReminderForm";

/**
 * Root composition. Each section is an isolated, self-contained module so the
 * page stays a thin, declarative shell — no business logic lives here.
 */
export function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <hr className="border-0 border-t border-hairline" />
        <Pillars />
        <SoundscapeSection />
        <WeeklyLoop />
        <ArchiveSection />
        <hr className="border-0 border-t border-hairline" />
        <DailyReminderForm />
      </main>
      <Footer />
    </>
  );
}
