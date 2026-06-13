import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite configuration.
 *
 * `base` is read from the `VITE_BASE` env var so the same build works for:
 *   - GitHub Pages project sites  -> VITE_BASE="/your-repo-name/"
 *   - Vercel / Netlify / root host -> VITE_BASE="/" (default)
 *
 * The CI workflow sets VITE_BASE automatically from the repository name.
 */
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: false,
    outDir: "dist",
  },
});
