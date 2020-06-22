module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-parsing-error": "off",
    "import/no-unresolved": "off",
    "space-before-function-paren": "off",
    "no-alert": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-plusplus": "off",
    "max-len": "off",
    "no-param-reassign": "off",
    "no-return-assign": "off",
    "consistent-return": "off",
    "operator-linebreak": "off",
    "linebreak-style": "off",
    "vue/no-parsing-error": "off"
  }
};
