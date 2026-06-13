import type { Config } from "tailwindcss";

/**
 * Design tokens for the hyper-minimalist "Reminder / Idea / Open Letter"
 * rebuild. Components reference these semantic names only — no arbitrary hex
 * utilities should appear in JSX.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E8",
        sage: "#A8B5A2",
        clay: "#C49A84",
        walnut: "#6B584C",
        mist: "#D8D4CE",
        charcoal: "#2D2D2D",
      },
      fontFamily: {
        // Single brand font. "FOT-Seurat Pro B" is a licensed commercial font
        // (see src/index.css); "Hanken Grotesk" is the free, warm, humanist
        // grotesque used as the default until that license is supplied.
        sans: ['"FOT-Seurat Pro B"', '"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        slow: "900ms",
        med: "450ms",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        fadeUp: "fadeUp 550ms cubic-bezier(0.22,0.61,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
