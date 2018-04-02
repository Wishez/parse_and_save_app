module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  "plugins": ["node"],
  "extends": [
    "eslint:recommended", 
    "plugin:node/recommended"
  ],
  "rules": {
      "node/exports-style": ["error", "module.exports"]
  },
  // add your custom rules here
  rules: {
  //  "no-undef": 1,
  //   "no-unused-vars": 1,
  //   "eqeqeq": [1, "smart"],
  //   "no-floating-decimal": 2,
  //   "no-multi-spaces": [2, {
  //     "exceptions": {
  //       "ImportDeclaration": true,
  //       "VariableDeclarator": true
  //     }
  //   }],
  //   "no-multi-str": 2,
  //   "camelcase": 1,
  //   // "eol-last": 1,
  //   "indent": [1, 4, {
  //     "SwitchCase": 1,
  //     "VariableDeclarator": 1
  //   }],
  //   // "quotes": [2, 'single', 'avoid-escape'],
  //   "semi": [1, 'always'],
  //   // "space-before-blocks": 2,
  //   // "space-before-function-paren": [2, 'never'],
  //   // "constructor-super": 2,
  //   // "arrow-spacing": 2,
  //   "no-console": 2,
  //   "vue/max-attributes-per-line": 'off',
  //   "prettier/prettier": ['error', { "semi": false }]
  }
}
