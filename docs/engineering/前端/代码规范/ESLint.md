# ESLint 使用手册

## 目录

- [简介](#简介)
- [安装](#安装)
- [配置](#配置)
- [常用规则](#常用规则)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

## 简介

ESLint 是一个开源的 JavaScript 代码检查工具，用于发现和修复代码中的问题。它可以帮助团队保持一致的代码风格，提高代码质量。

## 安装

### 项目安装

```bash
# 安装 ESLint 作为开发依赖
npm install eslint --save-dev

# 初始化 ESLint 配置文件
npx eslint --init
```

### 全局安装（可选）

```bash
npm install -g eslint
```

## 配置

### 配置文件

ESLint 支持多种配置文件格式：

- `.eslintrc.js`
- `.eslintrc.cjs`
- `.eslintrc.json`
- `.eslintrc.yml`
- `package.json` 中的 `eslintConfig` 字段

推荐使用 `.eslintrc.js` 格式，因为它支持注释和更灵活的配置：

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 自定义规则
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### 常用配置项说明

- `root`: 设置为 true 时，ESLint 将停止在父级目录中查找配置文件
- `env`: 指定代码运行环境
- `extends`: 继承其他配置文件
- `parser`: 指定解析器
- `parserOptions`: 解析器选项
- `plugins`: 使用的插件
- `rules`: 规则配置
- `settings`: 共享设置

## 常用规则

### 代码风格

```javascript
rules: {
  // 缩进使用 2 个空格
  'indent': ['error', 2],
  
  // 使用单引号
  'quotes': ['error', 'single'],
  
  // 语句末尾使用分号
  'semi': ['error', 'always'],
  
  // 最大行长度
  'max-len': ['error', { 'code': 100 }],
  
  // 禁止使用 console
  'no-console': 'warn',
  
  // 禁止未使用的变量
  'no-unused-vars': 'error',
  
  // 强制使用 === 和 !==
  'eqeqeq': ['error', 'always'],
}
```

### TypeScript 相关规则

```javascript
rules: {
  // 强制使用类型注解
  '@typescript-eslint/explicit-function-return-type': 'error',
  
  // 禁止使用 any
  '@typescript-eslint/no-explicit-any': 'error',
  
  // 强制使用 interface 而不是 type
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
}
```

### React 相关规则

```javascript
rules: {
  // 强制使用函数组件
  'react/function-component-definition': ['error', {
    'namedComponents': 'arrow-function',
    'unnamedComponents': 'arrow-function'
  }],
  
  // 强制使用 props 解构
  'react/destructuring-assignment': 'error',
  
  // 禁止使用未声明的 props
  'react/prop-types': 'error',
}
```

## 最佳实践

1. **渐进式采用**
   - 从基础规则开始
   - 逐步添加更严格的规则
   - 使用 `--fix` 自动修复简单问题

2. **团队协作**
   - 将配置文件纳入版本控制
   - 在 CI/CD 流程中集成 ESLint 检查
   - 定期更新规则集

3. **性能优化**
   - 使用 `.eslintignore` 忽略不需要检查的文件
   - 合理配置 `parserOptions`
   - 避免过度使用复杂的规则

4. **编辑器集成**
   - 配置编辑器插件实现实时检查
   - 启用保存时自动修复
   - 使用快捷键快速修复问题

## 常见问题

### 1. 如何忽略特定行或代码块？

```javascript
// 忽略下一行
// eslint-disable-next-line
const foo = 'bar';

/* eslint-disable */
// 忽略整个代码块
const bar = 'baz';
/* eslint-enable */
```

### 2. 如何处理第三方库的代码？

在 `.eslintignore` 文件中添加：

```text
node_modules/
dist/
build/
```

### 3. 如何与 Prettier 配合使用？

1. 安装依赖：

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

2. 在配置文件中添加：

```javascript
{
  extends: [
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
```

## 参考资源

- [ESLint 官方文档](https://eslint.org/)
- [ESLint 规则列表](https://eslint.org/docs/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React ESLint 插件](https://github.com/jsx-eslint/eslint-plugin-react)
