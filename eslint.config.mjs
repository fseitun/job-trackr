import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["**/node_modules", "**/dist"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["app/fe/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    ...pluginReactHooks.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    rules: {
      "react/react-in-jsx-scope": 0,
    },
  },
  {
    files: ["app/api/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
];
