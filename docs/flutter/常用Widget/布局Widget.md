# 布局Widget

## 单子元素布局

### 1. [Container](https://api.flutter.dev/flutter/widgets/Container-class.html)

Container是一个组合Widget，它本身不渲染任何内容，但可以在其子Widget周围添加装饰（如背景、边框、阴影等），并控制其大小和位置。

```dart
Container({
  Key key,
  AlignmentGeometry alignment, // 子Widget的对齐方式
  EdgeInsetsGeometry padding,  // 子Widget与Container边缘之间的间距
  EdgeInsetsGeometry margin,  // Container与外部其他Widget之间的间距
  Color color,  // Container的背景颜色
  Decoration decoration,  // Container的装饰
  Decoration foregroundDecoration,  // Container的前景装饰
  double width,  // Container的宽度
  double height, // Container的高度
  BoxConstraints constraints,  // Container的约束条件
  EdgeInsetsGeometry margin, // Container
  AlignmentGeometry alignment, // 子Widget的对齐方式
  Widget child, // Container内部的子Widget
})
```

### 2. [Center](https://api.flutter.dev/flutter/widgets/Center-class.html)

Center是一个居中布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Center({
  Key key,
  double widthFactor, // 子Widget的宽度因子
  double heightFactor, // 子Widget的高度因子
  Widget child, // 子Widget
})
```

### 3. [Align](https://api.flutter.dev/flutter/widgets/Align-class.html)

Align是一个对齐布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Align({
  Key key,
  AlignmentGeometry alignment, // 子Widget的对齐方式
  double widthFactor, // 子Widget的宽度因子
  double heightFactor, // 子Widget的高度因子
  Widget child, // 子Widget
})
```

### 4. [FractionallySizedBox](https://api.flutter.dev/flutter/widgets/FractionallySizedBox-class.html)

FractionallySizedBox是一个比例布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
FractionallySizedBox({
  Key key,
  double widthFactor, // 子Widget的宽度因子
  double heightFactor, // 子Widget的高度因子
  Widget child, // 子Widget
})
```

### 5. [SizedBox](https://api.flutter.dev/flutter/widgets/SizedBox-class.html)

SizedBox是一个固定大小布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
dart
SizedBox({
  Key key,
  double width, // 子Widget的宽度
  double height, // 子Widget的高度
  Widget child, // 子Widget
})
```

### 6. [FittedBox](https://api.flutter.dev/flutter/widgets/FittedBox-class.html)

FittedBox是一个自适应大小布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
FittedBox({
  Key key,
  BoxFit fit, // 子Widget的适应方式
  AlignmentGeometry alignment, // 子Widget的对齐方式
  Widget child, // 子Widget
})
```

### 7. [ConstrainedBox](https://api.flutter.dev/flutter/widgets/ConstrainedBox-class.html)

ConstrainedBox是一个约束布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
ConstrainedBox({
  Key key,
  BoxConstraints constraints, // 子Widget的约束
  Widget child, // 子Widget
})
```

### 8. [OverflowBox]([htttps](https://api.flutter.dev/flutter/widgets/OverflowBox-class.html))

OverflowBox是一个溢出布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
OverflowBox({
  Key key,
  AlignmentGeometry alignment, // 子Widget的对齐方式
  double minWidth, // 子Widget的最小宽度
  double maxWidth, // 子Widget的最大宽度
  double minHeight, // 子Widget的最小高度
  double maxHeight, // 子Widget的最大高度
  Widget child, // 子Widget
})
```

### 9. [AspectRatio](https://api.flutter.dev/flutter/widgets/AspectRatio-class.html)

AspectRatio是一个比例布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
AspectRatio({
  Key key,
  double aspectRatio, // 子Widget的宽高比
  Widget child, // 子Widget
})
```

### 10. [Offstage](https://api.flutter.dev/flutter/widgets/Offstage-class.html)

Offstage是一个隐藏布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Offstage({
  Key key,
  bool offstage, // 子Widget是否隐藏
  Widget child, // 子Widget
})
```

### 11. [Expanded](https://api.flutter.dev/flutter/widgets/Expanded-class.html)

Expanded是一个弹性布局Widget，它可以在其父Widget中占据剩余的空间。

```dart
Expanded({
  Key key,
  int flex, // 弹性因子
  Widget child, // 子Widget
})
```

### 12. [Positioned](https://api.flutter.dev/flutter/widgets/Positioned-class.html)

Positioned是一个定位布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Positioned({
  Key key,
  double left, // 子Widget的左边距
  double top, // 子Widget的上边距
  double right, // 子Widget的右边距
  double bottom, // 子Widget的下边距
  double width, // 子Widget的宽度
  double height, // 子Widget的高度
  Widget child, // 子Widget
})
```

## 多子元素布局

### 1. [Row](https://api.flutter.dev/flutter/widgets/Row-class.html)

Row是一个水平方向的布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Row({
  Key key,
  MainAxisAlignment mainAxisAlignment, // 子Widget在主轴上的对齐方式
  MainAxisSize mainAxisSize, // 子Widget在主轴上的大小
  CrossAxisAlignment crossAxisAlignment, // 子Widget在交叉轴上的对齐方式
  TextDirection textDirection, // 子Widget的文本方向
  VerticalDirection verticalDirection, // 子Widget的垂直方向
  TextBaseline textBaseline, // 子Widget的文本基线
  List<Widget> children, // 子Widget列表
})
```

### 2. [Column](https://api.flutter.dev/flutter/widgets/Column-class.html)

Column是一个垂直方向的布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Column({
  Key key,
  MainAxisAlignment mainAxisAlignment, // 子Widget在主轴上的对齐方式
  MainAxisSize mainAxisSize, // 子Widget在主轴上的大小
  CrossAxisAlignment crossAxisAlignment, // 子Widget在交叉轴上的对齐方式
  TextDirection textDirection, // 子Widget的文本方向
  VerticalDirection verticalDirection, // 子Widget的垂直方向
  TextBaseline textBaseline, // 子Widget的文本基线
  List<Widget> children, // 子Widget列表
})
```

### 3. [Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html)

Stack是一个堆叠布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Stack({
  Key key,
  AlignmentGeometry alignment, // 子Widget的对齐方式
  TextDirection textDirection, // 子Widget的文本方向
  Axis crossAxisAlignment, // 子Widget的交叉轴对齐方式
  Axis mainAxisAlignment, // 子Widget的主轴对齐方式
  List<Widget> children, // 子Widget列表
})
```

### 4. [IndexedStack](https://api.flutter.dev/flutter/widgets/IndexedStack-class.html)

IndexedStack是一个索引堆叠布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
IndexedStack({
  Key key,
  AlignmentGeometry alignment, // 子Widget的对齐方式
  TextDirection textDirection, // 子Widget的文本方向
  Axis crossAxisAlignment, // 子Widget的交叉轴对齐方式
  Axis mainAxisAlignment, // 子Widget的主轴对齐方式
  int index, // 子Widget的索引
  List<Widget> children, // 子Widget列表
})
```

### 5. [Flow](https://api.flutter.dev/flutter/widgets/Flow-class.html)

Flow是一个流式布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Flow({
  Key key,
  List<FlowDelegate> delegate, // 子Widget的排列方式
  List<Widget> children, // 子Widget列表
})
```

### 6. [Table](https://api.flutter.dev/flutter/widgets/Table-class.html)

Table是一个表格布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Table({
  Key key,
  TableBorder border, // 表格边框
  TableWidthType widthType, // 表格宽度类型
  TextDirection textDirection, // 子Widget的文本方向
  TableBorder horizontalBorder, // 表格水平边框
  TableBorder verticalBorder, // 表格垂直边框
  List<TableRow> children, // 子Widget列表
})
```

### 7. [Wrap](https://api.flutter.dev/flutter/widgets/Wrap-class.html)

Wrap是一个流式布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Wrap({
  Key key,
  Axis direction, // 子Widget的排列方向
  WrapAlignment alignment, // 子Widget在主轴上的对齐方式
  WrapCrossAlignment crossAxisAlignment, // 子Widget在交叉轴上的对齐方式
  VerticalDirection verticalDirection, // 子Widget的垂直方向
  TextDirection textDirection, // 子Widget的文本方向
  TextBaseline textBaseline, // 子Widget的文本基线
  List<Widget> children, // 子Widget列表
})
```

### 8. [ListBody](https://api.flutter.dev/flutter/widgets/ListBody-class.html)

ListBody是一个列表布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
ListBody({
  Key key,
  Axis mainAxis, // 子Widget的主轴方向
  TextDirection textDirection, // 子Widget的文本方向
  Axis crossAxisAlignment, // 子Widget的交叉轴对齐方式
  Axis mainAxisAlignment, // 子Widget的主轴对齐方式
  List<Widget> children, // 子Widget列表
})
```

### 10. [Flex](https://api.flutter.dev/flutter/widgets/Flex-class.html)

Flex是一个弹性布局Widget，它可以在其子Widget之间添加间隔，并控制其子Widget的对齐方式。

```dart
Flex({
  Key key,
  Axis direction, // 子Widget的排列方向
  MainAxisAlignment mainAxisAlignment, // 子Widget在主轴上的对齐方式
  MainAxisSize mainAxisSize, // 子Widget在主轴上的大小
  CrossAxisAlignment crossAxisAlignment, // 子Widget在交叉轴上的对齐方式
  TextDirection textDirection, // 子Widget的文本方向
  VerticalDirection verticalDirection, // 子Widget的垂直方向
  TextBaseline textBaseline, // 子Widget的文本基线
  List<Widget> children, // 子Widget列表
})
```


