module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'no-console': 1,
  },
}
