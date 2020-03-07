module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attributes-order': 'warning',
    'vue/no-confusing-v-for-v-if': 'warning',
    'vue/no-v-html': 'warning',
    'vue/order-in-components': 'warning',
    'vue/this-in-template': 'warning'
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ]
}
