# 绘制和效果Widget

## 1. [Opacity](https://api.flutter.dev/flutter/widgets/Opacity-class.html)

不透明度，用于控制子组件的不透明度

```dart
Opacity(
  opacity: 0.5, // 0.0-1.0
  child: Container(
    color: Colors.red,
  ),
)
```

## 2. [Transform](https://api.flutter.dev/flutter/widgets/Transform-class.html)

用于进行矩阵变换的Widget，矩阵变换包括平移、旋转、缩放等

```dart
Transform.translate(
  offset: Offset(100, 100),
  child: Container(
    color: Colors.red,
  ),
)
```

## 3. [DecoratedBox](https://api.flutter.dev/flutter/widgets/DecoratedBox-class.html)

可以在其子组件绘制前后绘制背景、边框、圆角等

```dart
DecoratedBox(
  decoration: BoxDecoration(
    color: Colors.red,
    borderRadius: BorderRadius.circular(10),
    border: Border.all(color: Colors.blue, width: 2),
  ),
  child: Container(
    width: 100,
    height: 100,
  ),
)
```

## 4. [ActionTranslation](https://api.flutter.dev/flutter/widgets/action_translation.html)

用于处理手势的Widget，可以处理平移、缩放、旋转等手势

```dart
GestureDetector(
  onPanUpdate: (details) {
    setState(() {
      _offset += details.delta;
    });
  },
  child: Transform.translate(
    offset: _offset,
    child: Container(
      width: 100,
      height: 100,
      color: Colors.red,
    ),
  ),
)
```

## 5. [RotatedBox](https://api.flutter.dev/flutter/widgets/RotatedBox-class.html)

用于旋转子组件的Widget

```dart
RotatedBox(
  quarterTurns: 1, // 旋转90度
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 6. [ClipOval](https://api.flutter.dev/flutter/widgets/ClipOval-class.html)

将子组件裁剪为椭圆形

```dart
ClipOval(
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 7. [ClipRRect](https://api.flutter.dev/flutter/widgets/ClipRRect-class.html)

将子组件裁剪为圆角矩形

```dart
ClipRRect(
  borderRadius: BorderRadius.circular(10),
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 8. [ClipRect](https://api.flutter.dev/flutter/widgets/ClipRect-class.html)

将子组件裁剪为矩形

```dart
ClipRect(
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 9. [ClipPath](https://api.flutter.dev/flutter/widgets/ClipPath-class.html)

将子组件裁剪为指定路径

```dart
ClipPath(// 裁剪为五角星
  clipper: StarClipper(5),
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 10. [CustomPaint](https://api.flutter.dev/flutter/widgets/CustomPaint-class.html)

用于自定义绘制

```dart
CustomPaint(
  painter: MyPainter(),
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```

## 11. [BackdropFilter](https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html)

用于在子组件后面添加一个模糊效果

```dart
BackdropFilter(
  filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)
```
