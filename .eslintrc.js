module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["airbnb-base", "airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
