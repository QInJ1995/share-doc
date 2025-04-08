# TypeScript 工程配置

让我们来了解如何配置 TypeScript 项目。

## tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件，它指定了编译选项和项目文件。

### 基本配置

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

### 编译选项详解

#### 基本选项

- `target`: 指定 ECMAScript 目标版本
- `module`: 指定模块系统
- `lib`: 指定要包含在编译中的库文件
- `allowJs`: 允许编译 JavaScript 文件
- `checkJs`: 在 .js 文件中报告错误
- `jsx`: 指定 JSX 代码的生成方式

#### 类型检查选项

- `strict`: 启用所有严格类型检查选项
- `noImplicitAny`: 不允许隐式的 any 类型
- `strictNullChecks`: 启用严格的 null 检查
- `strictFunctionTypes`: 启用函数类型的严格检查
- `strictBindCallApply`: 启用 bind、call 和 apply 的严格检查
- `strictPropertyInitialization`: 启用类属性初始化的严格检查

#### 模块解析选项

- `baseUrl`: 解析非相对模块名的基准目录
- `paths`: 模块名到基于 baseUrl 的路径映射
- `rootDirs`: 根文件夹列表
- `typeRoots`: 类型声明文件目录列表
- `types`: 需要包含的类型声明文件名列表

#### Source Map 选项

- `sourceMap`: 生成相应的 .map 文件
- `inlineSourceMap`: 将 SourceMap 嵌入到生成的 JavaScript 文件中
- `inlineSources`: 将源代码与 SourceMap 一起嵌入到生成的 JavaScript 文件中

#### 其他选项

- `experimentalDecorators`: 启用装饰器
- `emitDecoratorMetadata`: 为装饰器生成元数据
- `outDir`: 指定输出目录
- `outFile`: 将输出文件合并为一个文件
- `removeComments`: 删除所有注释
- `noEmit`: 不生成输出文件

## 项目结构

### 基本结构

```txt
project/
├── src/
│   ├── index.ts
│   ├── components/
│   └── utils/
├── tests/
├── dist/
├── node_modules/
├── package.json
└── tsconfig.json
```

### 推荐的文件组织方式

1. 按功能组织文件
2. 使用模块化结构
3. 分离测试文件
4. 使用类型声明文件

## 与构建工具集成

### Webpack

```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

### Babel

```json
// .babelrc
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}
```

## 类型声明文件

### 创建类型声明文件

```typescript
// types.d.ts
declare module "my-module" {
    export function doSomething(): void;
}
```

### 使用 DefinitelyTyped

```bash
npm install --save-dev @types/lodash
```

## 下一步

- [最佳实践](./11-best-practices.md)
- [常见问题](./12-faq.md)
- [实战项目](./13-practical-projects.md)
