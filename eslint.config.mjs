import globals from "globals";
import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: [
      "tests/**/*.{js,mjs,cjs,jsx}",
      "infra/**/*.{js,mjs,cjs,jsx}",
      "pages/**/*.{js,mjs,cjs,jsx}",
    ],
    plugins: { react },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
        ...jest.environments.globals.globals,
      },
    },
  },
  {
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  react.configs.flat["jsx-runtime"],
  jest.configs["flat/recommended"],
  eslintConfigPrettier,
]);
