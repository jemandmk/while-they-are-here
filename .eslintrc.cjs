/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.app.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react-refresh"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "postcss.config.js"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // Enforce the "no `any`" mandate from the engineering standards.
    "@typescript-eslint/no-explicit-any": "error",
  },
};
