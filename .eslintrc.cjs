// “关闭”或0-关闭规则
// “警告”或1-将规则作为警告（不会影响退出代码）
//“错误”或2-将规则作为错误打开（退出代码为1   触发）
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 禁止使用多余的包
    'import/no-extraneous-dependencies': [0, { devDependencies: true }],
    'max-classes-per-file': 1,
    // 组件名两个单词
    'vue/multi-word-component-names': 0,
    'no-trailing-spaces': 1,
    // 中缀操作符周围要不要有空格
    'space-infix-ops': 2,
    // 最大空行
    'no-multiple-empty-lines': [1, { max: 3 }],
    'vue/valid-v-model': 1,
    // 不允许存在continue
    'no-continue': 0,
    'func-names': 0,
    // 不允许有单独的if
    'no-lonely-if': 0,
    // todo 不允许对props赋值
    'vue/no-mutating-props': 0,
    'guard-for-in': 0,
    'import/first': 0,
    'prefer-destructuring': 0,
    'vue/no-v-for-template-key-on-child': 1,
    // 未使用的变量给出警告
    'no-unused-vars': 0,
    'no-multi-assign': 0,
    'no-debugger': 0,
    'vue/no-unused-vars': 0,
    'no-unused-expressions': [
      1,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    // 结束符
    'linebreak-style': ['off', 'windows'],
    // 变量未定义或引入
    'no-undef': 0,
    // 多余逗号
    'comma-dangle': 0,
    'no-nested-ternary': 0,
    // 是否强制分号
    semi: 1,
    // 括号前后强制一个空格
    'object-curly-spacing': 2,
    // 对象字面量中冒号的前后空格
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    // 逗号后是否有适当的空格
    'comma-spacing': [2, { after: true }],
    // import 后必须是新行
    'import/newline-after-import': 1,
    // 确保在导入路径内一致使用文件扩展名
    'import/extensions': 0,
    // 确保导入指向可以解析的文件/模块
    'import/no-unresolved': 0,
    // 首选默认导出导入/首选默认导出
    'import/prefer-default-export': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 禁止使用 new 以避免产生副作用
    'no-new': 0,
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 0,
    // 禁用 console
    'no-console': 0,
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 0,
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-confusing-arrow': 0,
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 0,
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁用特定的语法
    'no-restricted-syntax': 0,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 0,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': 'error',
    // 禁止重复模块导入
    'no-duplicate-imports': 'off',
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁止不必要的转义字符
    'no-useless-escape': 0,
    // 强制使用一致的缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 强制使用骆驼拼写法命名约定
    camelcase: 0,
    // 强制类方法使用 this
    'class-methods-use-this': 0,
    // 要求构造函数首字母大写
    'new-cap': 0,
    // 强制一致地使用 function 声明或表达式
    'func-style': 0,
    // 强制一行的最大长度
    'max-len': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制switch要有default分支
    'default-case': 0,
    // 强制剩余和扩展运算符及其表达式之间有空格
    'rest-spread-spacing': 'error',
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 'error',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 2,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ]
  }
};
