import { useCallback, useState } from "react";
import { OPEN_LETTER_INTRO, OPEN_LETTER_OUTRO, OPEN_LETTER_SUBJECT } from "../../data/content";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Button } from "../ui/Button";

/**
 * "The Open Letter" — a distraction-free reflection space. The "Email to Me"
 * action wraps the draft in a short open-letter framing and hands it to the
 * user's own mail client via a `mailto:` link, addressed by them, to
 * themselves — there is no backend and nothing is stored except locally.
 */
export function OpenLetterTab(): JSX.Element {
  const [draft, setDraft] = useLocalStorage("wth.openLetter.draft", "");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onEmailToMe = useCallback((): void => {
    const today = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const body = [today, "", OPEN_LETTER_INTRO, "", draft.trim(), "", OPEN_LETTER_OUTRO].join("\n");

    const mailto = `mailto:?subject=${encodeURIComponent(OPEN_LETTER_SUBJECT)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
    window.setTimeout(() => setStatus("idle"), 2600);
  }, [draft]);

  return (
    <div className="mx-auto max-w-[68ch] animate-fadeUp px-6 py-16 sm:py-24">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-clay">
        Save &amp; Reflect
      </p>
      <h1 className="mb-4 text-center text-2xl leading-snug sm:text-3xl md:text-[2.2rem]">
        Write yourself an open letter.
      </h1>
      <p className="mx-auto mb-10 max-w-[54ch] text-center text-base font-light leading-relaxed text-charcoal/80">
        Whatever came up today — a name, a sound, a regret, a plan — put it down here. Nothing is sent
        anywhere unless you choose to.
      </p>

      <label htmlFor="open-letter" className="sr-only">
        Your open letter
      </label>
      <textarea
        id="open-letter"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Dear me…"
        rows={12}
        className="focus-organic w-full resize-y rounded-sm border border-mist bg-cream/60 p-6 font-sans text-base leading-relaxed text-charcoal placeholder:text-charcoal/40"
      />

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={onEmailToMe} disabled={!draft.trim()}>
          Email to me
        </Button>
        <Button variant="ghost" onClick={() => setDraft("")} disabled={!draft.trim()}>
          Clear
        </Button>
        <span aria-live="polite" className="text-xs italic text-charcoal/60">
          {status === "sent" ? "Opening your mail app…" : ""}
        </span>
      </div>
      <p className="mt-4 text-center text-xs text-charcoal/50">
        Your draft is saved privately on this device. "Email to me" opens your mail app with the letter
        pre-filled — just address it to yourself and send.
      </p>
    </div>
  );
}
