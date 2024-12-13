# TS+Vite 搭建插件库

使用 `TypeScript` 和 `Vite` 搭建插件库并打包发布到 `npm`，你需要按照以下步骤来创建、配置、打包并发布插件。我们会实现一个基础的插件，它可以在 Vue 和 React 中使用，并最终打包发布。

## 初始化项目

首先，创建一个新的项目并初始化 npm 项目。

```bash
mkdir vue-react-plugin-library
cd vue-react-plugin-library
npm init -y
```

## 安装依赖

安装需要的依赖：`Vue`, `React`, `ReactDOM`, `Vite`, `TypeScript` 以及相应的插件。

```bash
# 安装 Vue 和 React 相关依赖
npm install vue react react-dom

# 安装开发依赖
npm install --save-dev vite typescript @vitejs/plugin-vue @vitejs/plugin-react vue-tsc @types/react @types/node
```

- `vue`, `react`, `react-dom`: 需要支持 Vue 和 React 的依赖。
- `@vitejs/plugin-vue`, `@vitejs/plugin-react`: 分别是 Vite 用于支持 Vue 和 React 的插件。
- `vue-tsc`: 用于 TypeScript 类型检查。

## 配置 TypeScript

在项目根目录创建 tsconfig.json 文件 或者 在终端执行 `tsc --init` 命令来生成。

```json
{
  "compilerOptions": {
    "target": "esnext", // 指定 ECMAScript 目标版本。"esnext" 表示编译为最新的 ECMAScript 版本。
    "module": "esnext", // 指定模块代码生成方式。"esnext" 表示使用最新的 ECMAScript 模块系统。
    "moduleResolution": "node", // 决定 Node.js 解析模块的方式。"node" 表示使用 Node.js 的模块解析策略。
    "strict": true, // 启用所有严格类型检查选项。这有助于捕捉潜在的错误。
    "esModuleInterop": true, // 启用与 ES 模块的互操作性。这允许导入 CommonJS 模块时不需要使用三斜线指令。
    "skipLibCheck": true, // 跳过所有 .d.ts 文件的类型检查。这可以加快编译速度。
    "declaration": true, // 生成相应的 .d.ts 文件。这有助于提供类型声明文件。
    "declarationDir": "./dist/types", // 指定生成的 .d.ts 文件的输出目录。这里设置为 ./dist/types。
    "sourceMap": true, // 生成相应的 .map 文件，用于调试。这可以帮助在调试时映射到源代码。
    "outDir": "./dist" // 指定编译后的文件输出目录。这里设置为 ./dist。
  },
  "include": ["src/**/*"], // 指定要包含在编译中的文件或目录。这里设置为 src/**/*，表示包含 src 目录下的所有文件和子目录。
  "exclude": ["node_modules", "dist"] // 指定要从编译中排除的文件或目录。这里设置为 node_modules 和 dist，表示排除这两个目录。
}
```

## 创建插件代码

创建 src/index.ts 文件并实现一个简单的插件。为了支持 Vue 和 React，我们会通过条件判断来适配两者的用法。

示例：创建一个简单的按钮组件

```typescript
// src/index.ts

import { App } from 'vue';
import React, { FC } from 'react';

// Vue 插件
const VueButton = {
  install(app: App) {
    app.component('MyButton', {
      template: '<button><slot></slot></button>',
    });
  },
};

// React 组件
const ReactButton: FC = ({ children }) => {
  return <button>{children}</button>;
};

// 导出为 Vue 和 React 两种环境下使用的插件
export { VueButton, ReactButton };
```

- `VueButton`: 这是一个 Vue 插件，它注册了一个简单的按钮组件。
- `ReactButton`: 这是一个 React 组件，提供一个按钮组件。

## 配置 Vite

创建 vite.config.ts 文件以配置 Vite 打包。

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [vue(), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueReactPluginLibrary',
      fileName: (format) => `vue-react-plugin-library.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'react', 'react-dom'], // 排除 Vue 和 React，避免重复打包
      output: {
        globals: {
          vue: 'Vue',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

在这里，`vue` 和 `react` 被标记为外部依赖，意味着它们不会被打包到输出文件中，而是由使用者提供。

## 添加构建命令

在 `package.json` 中添加构建脚本：

```json
"scripts": {
    "build": "vite build && npm run build:types",
    "build:types": "tsc",
    "dev": "vite"
}
```

## 测试插件

1. 在本地测试插件，使用 npm link 将插件链接到本地其他 Vue 或 React 项目中。
2. 在 Vue 或 React 项目中使用你的插件。

首先，运行以下命令将插件链接到全局：

```bash
npm link
```

然后，在 Vue 或 React 项目中运行以下命令链接到该插件：

```bash
npm link vue-react-plugin-library
```

在 Vue 项目中使用

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { VueButton } from 'vue-react-plugin-library';

createApp(App).use(VueButton).mount('#app');
```

在 React 项目中使用

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactButton } from 'vue-react-plugin-library';

const App = () => {
  return <ReactButton>Click Me</ReactButton>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## 构建插件

当你完成了插件的测试和修改后，执行构建命令来打包插件：

```bash
npm run build
```

Vite 将会在 dist 文件夹中生成 `vue-react-plugin-library` 的 UMD 格式、ES模块等文件。

## 配置 package.json

确保在 package.json 中设置了正确的字段：

```json
{
  "name": "vue-react-plugin-library",
  "version": "1.0.0",
  "description": "A simple plugin for both Vue and React",
  "main": "dist/vue-react-plugin-library.umd.js",
  "types": "dist/types/index.d.ts",
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/vue-react-plugin-library.git"
  },
  "peerDependencies": {
    "vue": "^3.0.0",
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  }
}
```

注意：`peerDependencies` 指定了 Vue 和 React 的版本要求，因为该插件是为了兼容这两者，而不是捆绑它们。

## 发布到 npm

登录到你的 npm 帐号，并发布插件：

```bash
npm login
npm publish --access public
```

## 使用插件

你可以通过以下命令在 Vue 或 React 项目中安装插件：

```bash
npm install vue-react-plugin-library
```

然后按照上面测试的方式在 Vue 或 React 中使用你的插件。
