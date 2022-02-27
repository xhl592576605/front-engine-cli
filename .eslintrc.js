module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,//也就是ES6语法支持的意思
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: ["error", "never"],
    '@typescript-eslint/no-var-requires':'off'
  }
}