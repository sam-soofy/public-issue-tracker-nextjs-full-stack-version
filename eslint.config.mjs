import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  js.configs.recommended,
  {
    rules: {
      // Enforce double quotes
      "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
      
      // Optional: fix inconsistent quote usage in the same file
      "@stylistic/quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }]
    }
  }
]);

export default eslintConfig;
