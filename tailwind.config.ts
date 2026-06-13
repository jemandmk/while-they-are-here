import type { Config } from "tailwindcss";

/**
 * Design tokens are lifted directly from the brand manual ("Anti-Aesthetic").
 * Components reference these semantic names only — no arbitrary hex utilities
 * should appear in JSX.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: {
          DEFAULT: "#faf7f2",
          deep: "#f1ece2",
        },
        charcoal: {
          DEFAULT: "#2e2b26",
          soft: "#57514a",
        },
        slate: {
          DEFAULT: "#4a5245",
          deep: "#3a4036",
        },
        taupe: {
          DEFAULT: "#b38b6d",
          deep: "#9a734f",
        },
        hairline: "#e3dccf",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        slow: "900ms",
        med: "550ms",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulse: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.1)", opacity: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulse: "pulse 3.4s ease-out infinite",
        fadeUp: "fadeUp 900ms cubic-bezier(0.22,0.61,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
