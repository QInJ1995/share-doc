# SWC

## 什么是 SWC

[SWC](https://swc.rs/) 是一个基于 Rust 的 JavaScript/TypeScript 编译器，旨在提供比 Babel 更快的编译速度。

## SWC 的优势

- 更快的编译速度
- 更小的输出文件
- 更好的 TypeScript 支持
- 更好的 JavaScript 支持

## SWC 的使用

SWC 可以通过命令行工具使用，也可以通过 Node.js API 使用。

### 命令行工具

SWC 提供了一个命令行工具，可以通过以下命令安装：

```bash
npm install -g swc
```

安装完成后，可以使用以下命令编译 JavaScript/TypeScript 文件：

```bash
swc input.js -o output.js
```

### Node.js API

SWC 还提供了一个 Node.js API，可以通过以下方式使用：

```javascript
const { transformFileSync } = require('swc/core');

const output = transformFileSync('input.js', {
  jsc: {
    parser: {
      syntax: 'typescript',
    },
  },
});

console.log(output.code);
```

## SWC 的配置

SWC 的配置可以通过命令行参数或配置文件进行设置。以下是一些常用的配置选项：

- `jsc.parser.syntax`：指定解析器的语法，可以是 `ecmascript` 或 `typescript`。默认为 `ecmascript`。
- `ecmascript.parser.jsx`：指定是否启用 JSX 解析。默认为 `false`。
- `ecmascript.parser.target`：指定编译的目标版本。默认为 `es5`。
- `minify`：指定是否启用代码压缩。默认为 `false`。
- `sourceMaps`：指定是否生成 source maps。默认为 `false`。
- `output.filename`：指定输出文件的名称。默认为 `input.js`。
- `output.dir`：指定输出文件的目录。默认为当前目录。
- `output.fileExtension`：指定输出文件的扩展名。默认为 `.js`。
- `output.sourceMapFile`：指定 source map 文件的名称。默认为 `input.js.map`。
- `output.sourceMapRoot`：指定 source map 文件的根路径。默认为当前目录。
- `output.sourceFileName`：指定 source map 文件的源文件名。默认为 `input.js`。
- `output.sourceMapUrl`：指定 source map 文件的 URL。默认为 `input.js.map`。
- `output.sourceMapSourcesContent`：指定是否在 source map 文件中包含源文件内容。默认为 `false`。
- `output.sourceMapSourcesRoot`：指定 source map 文件中源文件的根路径。默认为当前目录。

## SWC 的限制

SWC 目前还处于开发阶段，可能存在一些限制和问题。以下是一些已知的问题：

- 不支持所有的 JavaScript/TypeScript 特性
- 不支持所有的 Babel 插件和预设
- 不支持所有的 Babel 配置选项
- 不支持所有的 Babel 插件和预设

## SWC 的替代品

如果 SWC 不满足你的需求，你可以考虑以下替代品：

- Babel：一个流行的 JavaScript/TypeScript 编译器，支持所有的 JavaScript/TypeScript 特性，支持所有的 Babel 插件和预设，支持所有的 Babel 配置选项。
- esbuild：一个基于 Go 的 JavaScript/TypeScript 编译器，提供比 Babel 更快的编译速度，但不支持所有的 JavaScript/TypeScript 特性，不支持所有的 Babel 插件和预设，不支持所有的 Babel 配置选项。
- Terser：一个流行的 JavaScript 压缩器，提供比 Babel 更快的压缩速度，但不支持所有的 JavaScript 特性，不支持所有的 Babel 插件和预设，不支持所有的 Babel 配置选项。
- uglify-js：一个流行的 JavaScript 压缩器，提供比 Babel 更快的压缩速度，但不支持所有的 JavaScript 特性，不支持所有的 Babel 插件和预设，不支持所有的 Babel 配置选项。
  