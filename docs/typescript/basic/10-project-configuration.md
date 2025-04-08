# 第十章：工程配置

## TypeScript 配置文件

TypeScript 使用 `tsconfig.json` 文件来配置编译选项和项目设置。

### 1. 基本配置

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

### 2. 编译选项详解

#### 基本选项

```json
{
    "compilerOptions": {
        // 指定 ECMAScript 目标版本
        "target": "es5",
        
        // 指定模块系统
        "module": "commonjs",
        
        // 指定库文件
        "lib": ["es6", "dom"],
        
        // 允许编译 JavaScript 文件
        "allowJs": true,
        
        // 检查 JavaScript 文件
        "checkJs": true,
        
        // 生成声明文件
        "declaration": true,
        
        // 生成 sourceMap
        "sourceMap": true,
        
        // 输出目录
        "outDir": "./dist",
        
        // 根目录
        "rootDir": "./src",
        
        // 移除注释
        "removeComments": true,
        
        // 不生成输出文件
        "noEmit": true,
        
        // 导入帮助函数
        "importHelpers": true,
        
        // 降级迭代器
        "downlevelIteration": true,
        
        // 隔离模块
        "isolatedModules": true
    }
}
```

#### 严格类型检查选项

```json
{
    "compilerOptions": {
        // 启用所有严格类型检查选项
        "strict": true,
        
        // 不允许隐式的 any 类型
        "noImplicitAny": true,
        
        // 不允许 null 和 undefined 赋值给其他类型
        "strictNullChecks": true,
        
        // 不允许函数参数双向协变
        "strictFunctionTypes": true,
        
        // 不允许 this 隐式 any
        "strictBindCallApply": true,
        
        // 严格属性初始化检查
        "strictPropertyInitialization": true,
        
        // 不允许未使用的局部变量
        "noUnusedLocals": true,
        
        // 不允许未使用的参数
        "noUnusedParameters": true,
        
        // 不允许有返回值的函数没有返回值
        "noImplicitReturns": true,
        
        // 不允许 switch 语句贯穿
        "noFallthroughCasesInSwitch": true
    }
}
```

#### 模块解析选项

```json
{
    "compilerOptions": {
        // 模块解析策略
        "moduleResolution": "node",
        
        // 基础目录
        "baseUrl": ".",
        
        // 路径映射
        "paths": {
            "*": ["*", "src/*"]
        },
        
        // 根目录
        "rootDirs": ["src", "generated"],
        
        // 类型声明文件
        "typeRoots": ["./typings", "./node_modules/@types"],
        
        // 类型声明文件
        "types": ["node", "lodash", "express"],
        
        // 允许从没有设置默认导出的模块中默认导入
        "allowSyntheticDefaultImports": true,
        
        // 不把符号链接解析为真实路径
        "preserveSymlinks": true
    }
}
```

#### 源映射选项

```json
{
    "compilerOptions": {
        // 生成 sourceMap
        "sourceMap": true,
        
        // 指定 sourceMap 的根路径
        "sourceRoot": "",
        
        // 指定 map 文件的位置
        "mapRoot": "",
        
        // 生成声明文件
        "declaration": true,
        
        // 指定声明文件的目录
        "declarationDir": "",
        
        // 生成声明文件的 sourceMap
        "declarationMap": true,
        
        // 移除注释
        "removeComments": true
    }
}
```

#### 实验性选项

```json
{
    "compilerOptions": {
        // 启用装饰器
        "experimentalDecorators": true,
        
        // 为装饰器生成元数据
        "emitDecoratorMetadata": true,
        
        // 启用 JSX
        "jsx": "preserve"
    }
}
```

### 3. 项目引用

TypeScript 3.0 引入了项目引用功能，允许将 TypeScript 程序分割成更小的部分：

```json
{
    "compilerOptions": {
        // ...
    },
    "references": [
        { "path": "./shared" },
        { "path": "./src" }
    ]
}
```

### 4. 文件包含和排除

```json
{
    "compilerOptions": {
        // ...
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

## 构建工具集成

### 1. Webpack 配置

```javascript
const path = require('path');

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

### 2. Babel 配置

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
```

### 3. ESLint 配置

```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
    }
}
```

## 最佳实践

### 1. 项目结构

```
project/
├── src/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── index.ts
├── tests/
├── dist/
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

### 2. 配置建议

- 使用 `strict` 模式
- 启用 `sourceMap`
- 使用 `outDir` 指定输出目录
- 使用 `include` 和 `exclude` 控制编译范围
- 使用 `paths` 配置路径别名
- 使用项目引用管理大型项目

### 本章小结

- 学习了 TypeScript 配置文件的结构和选项
- 了解了各种编译选项的作用
- 掌握了项目引用的使用方法
- 理解了与构建工具的集成
- 学习了项目配置的最佳实践

在下一章中，我们将学习 TypeScript 的最佳实践。
