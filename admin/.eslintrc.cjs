module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2021, // 适用于 ES9 以及更新版本
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended', // 如果使用 Vue.js
        '@vue/standard', // 如果使用 Vue.js Standard 风格
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 在生产环境中禁止使用 console，开发环境中允许
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 在生产环境中禁止使用 debugger，开发环境中允许
        'space-before-function-paren': 0, // 函数括号前不需要空格
        'vue/array-bracket-spacing': 0, // 数组括号内不需要空格
        'vue/arrow-spacing': 0, // 箭头函数的箭头前后不需要空格
        'vue/block-spacing': 0, // 代码块内不需要空格
        'vue/brace-style': 'error', // 大括号风格错误
        'vue/camelcase': 'error', // 驼峰命名错误
        'vue/comma-dangle': 'error', // 逗号悬挂错误
        'vue/component-name-in-template-casing': 'error', // 模板中的组件名称大小写错误
        'vue/eqeqeq': 'error', // 必须使用全等
        'vue/key-spacing': 0, // 键值对之间不需要空格
        'vue/match-component-file-name': 'error', // 组件名称与文件名不匹配错误
        'vue/object-curly-spacing': 0, // 对象大括号内不需要空格
        'vue/max-attributes-per-line': 0, // 每行最大属性数不限制
        'padded-blocks': 0, // 代码块内不需要填充空行
        'semi': 0, // 不需要分号
        'indent': 0, // 不需要缩进
        'space-infix-ops': 0, // 操作符周围不需要空格
        'space-before-blocks': 0, // 代码块前不需要空格
        'eqeqeq': 0, // 不强制使用全等
        'object-curly-spacing': 0, // 对象大括号内不需要空格
        'keyword-spacing': 0, // 关键字周围不需要空格
        'spaced-comment': 0, // 注释前不需要空格
        'key-spacing': 0, // 键值对之间不需要空格
        'comma-spacing': 0, // 逗号前后不需要空格
        'comma-dangle': 0, // 不需要逗号悬挂
        'space-in-parens': 0, // 括号内不需要空格
        'standard/object-curly-even-spacing': 0, // 对象大括号内不需要空格
    }
}
