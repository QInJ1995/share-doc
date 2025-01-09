# 文本Widget

## 1. [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)

Text 是最常用的文本显示 Widget，用于显示单行或多行文本。

```dart
Text(
  'Hello, World!',
  style: TextStyle(color: Colors.blue, fontSize: 20), // style：文本样式 
  textAlign: TextAlign.center, // 文本对齐方式 
  textDirection: TextDirection.ltr, // 文本方向
  locale: Locale('en', 'US'), // 语言环境 
  softWrap: true, // 是否自动换行 
  overflow: TextOverflow.ellipsis, // 文本溢出处理方式 
  textScaleFactor: 1.5, // 文本缩放因子 
  maxLines: 2, // 最大行数
  semanticsLabel: 'Hello, World!', // 语义标签
  textWidthBasis: TextWidthBasis.longestLine, // 文本宽度基准
  textHeightBehavior: TextHeightBehavior(applyHeightToFirstAscent: true), // 文本高度行为
)
```

## 2. [RichText](https://api.flutter.dev/flutter/widgets/RichText-class.html)

RichText 可以包含多种样式的文本，通过 TextSpan 来定义文本的样式和内容。

```dart
RichText(
  text: TextSpan(
    text: 'Hello, ',
    style: TextStyle(color: Colors.blue, fontSize: 20),
    children: <TextSpan>[
      TextSpan(
        text: 'World!',
        style: TextStyle(color: Colors.red, fontSize: 20),
      ),
    ],
  ),
  textAlign: TextAlign.center, // 文本对齐方式 
  textDirection: TextDirection.ltr, // 文本方向
  locale: Locale('en', 'US'), // 语言环境
  softWrap: true,  // 是否自动换行 
  overflow: TextOverflow.ellipsis, // 文本溢出处理方式
  textScaleFactor: 1.5, // 文本缩放因子 
  maxLines: 2, // 文本宽度基准
  textWidthBasis: TextWidthBasis.longestLine, // 文本高度行为
  textHeightBehavior: TextHeightBehavior(applyHeightToFirstAscent: true), // 文本宽度行为
)
```
