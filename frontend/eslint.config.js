import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        // Browser (used by lang.js / BaseLayout inline script / formerly shareSite)
        window: "readonly",
        navigator: "readonly",
        document: "readonly",
        localStorage: "readonly",
        CustomEvent: "readonly",
        IntersectionObserver: "readonly",
        // Common browser/runtime helpers used in islands
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        HTMLDivElement: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
];
