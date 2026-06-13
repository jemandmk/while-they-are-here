import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: Variant;
  readonly withDot?: boolean;
  readonly children: ReactNode;
}

const BASE =
  "inline-flex items-center gap-3 rounded-sm px-7 py-4 font-sans text-sm uppercase tracking-[0.06em] " +
  "cursor-pointer transition-all duration-med ease-organic focus-organic " +
  "hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  solid: "border border-slate bg-slate text-linen hover:bg-slate-deep hover:tracking-[0.09em]",
  ghost: "border border-slate bg-transparent text-slate hover:bg-slate/10",
};

/** Shared call-to-action button with the brand's slow, organic hover. */
export function Button({
  variant = "solid",
  withDot = false,
  className = "",
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {withDot ? <span className="h-[7px] w-[7px] rounded-full bg-taupe" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
