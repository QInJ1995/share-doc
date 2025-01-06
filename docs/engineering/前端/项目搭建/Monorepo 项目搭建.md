# Monorepo 项目搭建

Monorepo（Mono Repository）是一种将多个相关项目或模块放在同一个 Git 仓库中的管理方式。相比多个仓库管理，Monorepo 提供了集中化管理、共享代码、简化依赖等优点。`pnpm` 是一个高效的 JavaScript 包管理工具，支持创建和管理 Monorepo，特别适合处理大型项目的依赖管理。

本教程将详细介绍如何使用 `pnpm` 搭建一个 Monorepo 项目，管理多个子包（packages），并实现高效的构建和依赖管理。

## 环境准备

### 安装 pnpm

首先，你需要确保已经安装了 `pnpm`。可以通过以下命令来安装 `pnpm`：

```bash
npm install -g pnpm
```

或者，你可以使用 `yarn` 或 `npx` 来安装和使用 `pnpm`。

### 初始化 Git 仓库

创建一个新的 `Git` 仓库，用于存放你的 `Monorepo` 项目。

```bash
mkdir my-monorepo
cd my-monorepo
git init
```

## 初始化 pnpm 项目

### 初始化 pnpm 工作区

在 `my-monorepo` 目录下，初始化一个 `pnpm` 项目。首先运行：

```bash
pnpm init
```

然后创建 `pnpm-workspace.yam`l 文件，这是 `pnpm` 用于识别工作区的配置文件。

```yaml
packages:
  - 'packages/*'
```

### 配置 package.json

在根目录下的 `package.json` 中，设置 `private` 属性为 `true`，确保此项目不会被发布到 npm 上。

```json
{
  "private": true,
  "name": "my-monorepo",
  "workspaces": [
    "packages/*"
  ]
}
```

这个配置启用了 pnpm 的工作区特性，并指定了工作区的路径。

## 创建子包（Packages）

### 创建第一个子包

在 `packages` 目录下创建一个名为 `my-package` 的子包：

```bash
mkdir packages/my-package
cd packages/my-package
pnpm init
```

创建 `packages/my-package/package.json` 文件，并设置基本信息：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building my-package'"
  }
}
```

### 创建第二个子包

同样在 `packages` 目录下创建另一个子包 `my-other-package`：

```bash
mkdir packages/my-other-package
cd packages/my-other-package
pnpm init
```

创建 `packages/my-other-package/package.json` 文件，并添加内容：

```json
{
  "name": "my-other-package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building my-other-package'"
  }
}
```

### 在子包之间建立依赖关系

如果一个子包依赖于另一个子包，你可以直接在 `my-other-package` 的 `package.json` 文件中引用 `my-package`。

编辑 `packages/my-other-package/package.json`，添加 `my-package` 作为依赖：

```json
{
  "name": "my-other-package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building my-other-package'"
  },
  "dependencies": {
    "my-package": "1.0.0"
  }
}
```

在 `packages/my-other-package/index.js` 中，可以使用 `my-package`：

```javascript
const myPackage = require('my-package');
console.log(myPackage);
```

## 安装依赖

使用 `pnpm` 安装所有的依赖：

```bash
pnpm install
```

此命令会根据工作区的配置，安装所有子包的依赖，并在根目录创建一个 `node_modules` 文件夹。在 `pnpm` 中，不同于 `npm` 和 `yarn`，`node_modules` 中会使用软链接（symlink）来连接共享的依赖，从而避免冗余的依赖安装，减少磁盘占用。

## 管理和构建项目

### 构建所有包

可以通过 `pnpm` 来构建所有包。在根目录下运行以下命令：

```bash
pnpm run build --filter my-package
pnpm run build --filter my-other-package
```

`--filter` 选项用于筛选特定的包，若要构建所有包，可以使用以下命令：

```bash
pnpm run build --filter '*'
```

### 版本管理

`pnpm` 在管理版本时，推荐使用语义版本控制（SemVer）。你可以手动更新子包的版本，或者使用以下命令发布新版本：

```bash
pnpm publish --workspace-root
```

### 使用脚本自动化构建

你可以为根目录添加一些常见的构建和测试脚本。在根目录的 `package.json` 文件中，添加以下脚本：

```json
{
  "scripts": {
    "build": "pnpm run build --filter '*'",
    "test": "pnpm run test --filter '*'"
  }
}
```

### 使用 pnpm 执行跨包任务

`pnpm` 提供了多种任务执行选项，能够在工作区内的多个包之间共享和执行任务。例如，在构建和发布时，你可以通过 `--filter` 参数只执行有更改的包，避免不必要的构建过程。

## 配置 CI/CD 流水线

### 集成 GitHub Actions

Monorepo 的构建和发布通常需要配置 CI/CD。可以使用 GitHub Actions 来自动化工作流。

以下是一个简单的 GitHub Actions 配置，自动安装依赖并构建 Monorepo：

```yaml
name: Build and Test Monorepo

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
      - name: Install dependencies
        run: pnpm install

  build:
    runs-on: ubuntu-latest
    needs: install
    steps:
      - uses: actions/checkout@v2
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
      - name: Build all packages
        run: pnpm run build
```

### 集成 GitLab CI

在 GitLab CI 中，你可以使用类似的 `.gitlab-ci.yml` 配置：

```yaml
stages:
  - install
  - build
  - test

install:
  stage: install
  script:
    - pnpm install

build:
  stage: build
  script:
    - pnpm run build

test:
  stage: test
  script:
    - pnpm run test
```

## 版本控制和提交

### 提交更改

使用 Git 提交所有更改：

```bash
git add .
git commit -m "feat: Add my-package and my-other-package"
git push origin main
```

发布新版本

发布新版本时，可以使用以下命令：

```bash
pnpm publish --workspace-root
```

## 优化和扩展

### 使用缓存和增量构建

`pnpm` 支持通过缓存和增量构建来优化 `Monorepo` 项目的构建效率。你可以通过 `pnpm` 提供的增量构建工具来加速构建过程。

### 使用 pnpm 插件

`pnpm` 提供了很多插件来扩展其功能，例如：

- `pnpm patch`: 用于快速修复依赖版本。
- `pnpm dev`: 用于开发模式下的自动构建。
