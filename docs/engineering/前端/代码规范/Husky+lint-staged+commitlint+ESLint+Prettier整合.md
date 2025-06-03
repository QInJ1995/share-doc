# Husky+lint-staged+commitlint+ESLint+Prettier整合

## 目录

- [简介](#简介)
- [工具介绍](#工具介绍)
- [安装步骤](#安装步骤)
- [配置说明](#配置说明)
- [使用说明](#使用说明)
- [常见问题](#常见问题)

## 简介

本文档详细说明了如何使用 Husky、lint-staged、commitlint、ESLint 和 Prettier 来统一前端代码规范和 Git 提交规范。这套工具链可以帮助团队：

- 统一代码风格
- 自动格式化代码
- 规范 Git 提交信息
- 在提交代码前进行代码检查
- 提高代码质量

## 工具介绍

### Husky

Husky 是一个 Git hooks 工具，可以在 Git 事件触发时执行指定的脚本，比如在 commit 前执行代码检查。

### lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具，可以确保只对暂存区的文件进行检查，提高效率。

### commitlint

commitlint 用于检查 Git 提交信息是否符合规范，支持 Angular 提交规范。

### ESLint

ESLint 是一个代码检查工具，用于发现和修复 JavaScript/TypeScript 代码中的问题。

### Prettier

Prettier 是一个代码格式化工具，支持多种语言，可以自动格式化代码。

## 安装步骤

1. 安装所需依赖：

```bash
# 安装 husky
npm install husky --save-dev

# 安装 lint-staged
npm install lint-staged --save-dev

# 安装 commitlint 相关依赖
npm install @commitlint/cli @commitlint/config-conventional --save-dev

# 安装 ESLint 相关依赖
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

# 安装 Prettier 相关依赖
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

2. 初始化 Husky：

```bash
npx husky install
```

3. 添加 prepare 脚本到 package.json：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 配置说明

### 1. ESLint 配置 (.eslintrc.js)

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // 自定义规则
  }
};
```

### 2. Prettier 配置 (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### 3. commitlint 配置 (commitlint.config.js)

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
```

### 4. lint-staged 配置 (package.json)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 5. Husky 配置

创建 pre-commit hook：

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

创建 commit-msg hook：

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

## 使用说明

### 代码提交规范

提交信息格式：

```text
<type>(<scope>): <subject>

<body>

<footer>
```

type 类型说明：

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- perf: 性能优化
- test: 增加测试
- build: 构建过程或辅助工具的变动
- ci: CI 配置相关
- chore: 其他改动

### 常用命令

```bash
# 检查代码
npm run lint

# 格式化代码
npm run format

# 提交代码
git add .
git commit -m "feat: 添加新功能"
```

## 常见问题

### 1. Husky 不生效

- 检查 package.json 中是否有 prepare 脚本
- 确认 .husky 目录是否存在
- 检查 Git hooks 是否正确安装

### 2. ESLint 报错

- 检查 .eslintrc.js 配置是否正确
- 确认相关依赖是否安装完整
- 检查是否有冲突的配置

### 3. Prettier 格式化问题

- 检查 .prettierrc 配置
- 确认文件是否被 .prettierignore 忽略
- 检查是否有与 ESLint 规则冲突

### 4. commitlint 报错

- 确认提交信息格式是否正确
- 检查 commitlint.config.js 配置
- 确认 husky 的 commit-msg hook 是否正确配置

## 注意事项

1. 确保团队成员都安装了相同的依赖版本
2. 建议在项目根目录添加 .editorconfig 文件，统一编辑器配置
3. 定期更新依赖包版本，修复潜在问题
4. 根据团队实际情况调整规则配置
5. 建议将配置文件加入版本控制
