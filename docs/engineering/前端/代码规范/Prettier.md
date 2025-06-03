# Prettier

Prettier 是一个代码格式化工具，它使用 JavaScript 代码来格式化代码，并遵循一定的规则。Prettier 的目标是确保代码具有一致的格式，并减少代码的错误。

## 安装

### 全局安装

```bash
npm install --global prettier
```

### 项目本地安装

```bash
npm install --save-dev prettier
```

## 基本使用

### 命令行使用

```bash
# 格式化单个文件
prettier --write src/index.js

# 格式化整个目录
prettier --write "src/**/*.{js,jsx,ts,tsx,css,scss,json}"
```

### 配置文件

在项目根目录创建 `.prettierrc` 文件：

```json
{
  "semi": true,                 // 使用分号
  "singleQuote": true,          // 使用单引号
  "tabWidth": 2,               // 缩进空格数
  "printWidth": 80,            // 每行代码长度
  "trailingComma": "es5",      // 尾随逗号
  "bracketSpacing": true,      // 对象字面量中的括号空格
  "arrowParens": "avoid",      // 箭头函数参数括号
  "endOfLine": "lf"           // 行尾换行符
}
```

## 编辑器集成

### VS Code

1. 安装 Prettier 插件
2. 在设置中启用 "Format On Save"
3. 设置 Prettier 为默认格式化工具

### WebStorm

1. 安装 Prettier 插件
2. 在设置中启用 "On Save" 格式化

## 忽略文件

创建 `.prettierignore` 文件来指定不需要格式化的文件：

```text
# 忽略构建目录
build
dist

# 忽略依赖目录
node_modules

# 忽略特定文件
*.min.js
```

## 常用配置选项

- `semi`: 是否使用分号
- `singleQuote`: 是否使用单引号
- `tabWidth`: 缩进空格数
- `printWidth`: 每行代码长度
- `trailingComma`: 尾随逗号设置
- `bracketSpacing`: 对象字面量中的括号空格
- `arrowParens`: 箭头函数参数括号
- `endOfLine`: 行尾换行符
- `useTabs`: 是否使用 tab 缩进
- `quoteProps`: 对象属性引号处理
- `jsxSingleQuote`: JSX 中是否使用单引号
- `jsxBracketSameLine`: JSX 标签的反尖括号是否换行

## 最佳实践

1. 在项目初始化时就配置好 Prettier
2. 将配置文件提交到版本控制系统
3. 在 CI/CD 流程中加入 Prettier 检查
4. 与 ESLint 配合使用，处理代码质量和格式化
5. 团队统一使用相同的配置

## 常见问题

### 与 ESLint 冲突

如果遇到与 ESLint 规则冲突，可以：

1. 使用 `eslint-config-prettier` 关闭冲突的规则
2. 使用 `eslint-plugin-prettier` 将 Prettier 规则集成到 ESLint 中

### 忽略特定代码块

使用特殊注释来忽略格式化：

```javascript
// prettier-ignore
const uglyCode = {
    foo:    true,
    bar: "hello",
    baz: 5
};
```

## 相关工具

- `prettier-eslint`: 结合 ESLint 和 Prettier
- `prettier-stylelint`: 结合 Stylelint 和 Prettier
- `prettier-plugin-packagejson`: 格式化 package.json
- `prettier-plugin-organize-imports`: 自动组织导入语句

## 参考资源

- [Prettier 官方文档](https://prettier.io/)
- [Prettier 配置选项](https://prettier.io/docs/en/options.html)
  