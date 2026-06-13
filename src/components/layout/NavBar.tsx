import { useEffect, useState } from "react";

const LINKS: ReadonlyArray<{ readonly href: string; readonly label: string }> = [
  { href: "#pillars", label: "The Pillars" },
  { href: "#soundscape", label: "The Soundscape" },
  { href: "#weekly", label: "The Weekly Loop" },
  { href: "#archive", label: "The Archive" },
];

/** Sticky, translucent navigation with a hairline that appears on scroll. */
export function NavBar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-med " +
        (scrolled ? "border-hairline bg-linen/85" : "border-transparent bg-linen/80")
      }
    >
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-7 py-[18px]">
        <a href="#top" className="font-serif text-[1.12rem] uppercase tracking-[0.06em] text-charcoal no-underline">
          While They&rsquo;re <span className="text-taupe-deep">Here</span>
        </a>
        <nav className="hidden gap-[30px] md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.82rem] uppercase tracking-[0.04em] text-charcoal-soft no-underline transition-colors duration-med hover:text-taupe-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
