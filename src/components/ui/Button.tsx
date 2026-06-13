import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: Variant;
  readonly children: ReactNode;
}

const BASE =
  "inline-flex items-center justify-center gap-3 rounded-sm px-7 py-4 font-sans text-sm uppercase tracking-[0.06em] " +
  "cursor-pointer transition-all duration-med ease-organic focus-organic " +
  "hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  solid: "border border-walnut bg-walnut text-cream hover:bg-walnut/90",
  ghost: "border border-walnut bg-transparent text-walnut hover:bg-walnut/10",
};

/** Shared call-to-action button. */
export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
