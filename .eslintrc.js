// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "space-before-function-paren": 0, // 函数定义时括号前面要不要有空格
    "eol-last": 0, // 文件以单一的换行符结束
    "no-extra-semi": 0, // 可以多余的冒号
    semi: 0, // 语句可以不需要分号结尾
    eqeqeq: 0, // 必须使用全等
    "one-var": 0, // 连续声明
    "no-undef": 0, // 可以 有未定义的变量
    "no-unused-vars": 0, // 不能有声明后未被使用的变量或参数
    "no-use-before-define": 0, // 未定义前不能使用
    "spaced-comment": 0,
    "padded-blocks": 0,
    "no-redeclare": 0,
    "indent": 0,
    "space-before-blocks": 0,
    "quotes": 0, //引号
    "new-cap": 0,
    "no-multiple-empty-lines": 0, //可以多行空格
    "wrap-iife": 0,
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};