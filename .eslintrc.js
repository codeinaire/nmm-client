module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "prettier",
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-react-hooks",
  ],
  parser: "typescript",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        "function-call-argument-newline": "consistent",
        allowAllPropertiesOnSameLine: false,
        trailingComma: "none",
      },
    ],
    curly: ["error", "multi-line"],
    camelcase: 1,
    "eslint-plugin-react-hooks/rules-of-hooks": "warn",
    "eslint-plugin-react-hooks/exhaustive-deps": "warn",
  },
  ignorePatterns: "/node_modules/**",
  settings: {
    react: {
      version: "detect",
    },
  },
};
