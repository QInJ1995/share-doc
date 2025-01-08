# StatelessWidget与StatefulWidget开发指南

Flutter的widget很多，但主要可以分为两类，一种是无状态的`widget（StatelessWidget）`，一种是有状态的`widget（StatefulWidget）`。

接下来将带着大家一起认识什么是StatelessWidget？、什么是StatefulWidget？以及StatefulWidget和StatelessWidget都有哪些最佳实践？。

## 什么是StatelessWidget

Flutter中的 `StatelessWidget` 是一个不需要状态更改的`widget`，它没有要管理的内部状态。

当您描述的用户界面部分不依赖于对象本身中的配置信息以及 `widget` 的 `BuildContext` 时，无状态 `widget` 非常有用。

`AboutDialog`, `CircleAvatar` 和 `Tex`t 都是StatelessWidget的子类。

```dart
// Flutter
void main() => runApp(const MyStatelessWidget(text: "StatelessWidget Example"));

class MyStatelessWidget extends StatelessWidget {
    final String text;
    const MyStatelessWidget({Key? key, required this.text}) : super(key: key);
    @override
    Widget build(BuildContext context) {
        return Center(
            child: Text(
                text,
                textDirection: TextDirection.ltr,
            ),
        );
    }
}
```

在前面的示例中，您使用了 `MyStatelessWidget` 类的构造函数 传递标记为 `final` 的 `text` 。这个类继承了 `StatelessWidget` -它包含不可变数据

无状态 `widget` 的 `build` 方法通常只会在以下三种情况调用:

- 将 `widget` 插入树中时
- 当 `widget` 的父级更改其配置时
- 当它依赖的 [`InheritedWidget`](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html) 发生变化时

## 什么是StatefulWidget

[`StatefulWidget`](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html) 是可变状态的 `widget` 。 使用 `setState` 方法管理 `StatefulWidget` 的状态的改变。调用 `setState` 告诉 `Flutter` 框架，某个状态发生了变化，Flutter会重新运行 `build` 方法，以便应用程序可以应用最新状态。

状态是在构建 `widget` 时可以同步读取的信息可能会在widget的生命周期中发生变化。确保在状态改变时及时通知状态 变化是 `widget` 实现者的责任。当 `widget` 可以动态更改时，需要使用 `StatefulWidget` 。 例如, 通过键入表单或移动滑块来更改 `widget` 的状态. 或者, 它可以随时间变化- 或者数据推送更新UI

`Checkbox`, `Radio`, `Slider`, `InkWell`, `Form`, 和 `TextField` 都是有状态的 `widget`，也是 `StatefulWidget` 的子类。

下面的示例声明了一个StatefulWidget，它需要一个createState()方法。此方法创建管理widget状态的状态对象_MyStatefulWidgetState。

```dart
class MyStatefulWidget extends StatefulWidget {
    MyStatefulWidget({Key key, this.title}) : super(key: key);
    final String title;
    @override
    _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}
```

以下状态类 `_MyStatefulWidgetState` 实现 `widget` 的 `build()` 方法。当状态改变时，例如，当用户切换按钮时，使用新的切换值调用 `setState`。这会导致框架在UI中重建此widget。

```dart
import 'package:flutter/material.dart';
void main() =>
runApp(const MyStatefulWidget(title: "StatelessWidget与StatefulWidget开发指南"));
class MyStatefulWidget extends StatefulWidget {
    const MyStatefulWidget({Key? key, required this.title}) : super(key: key);
    final String title;
    @override
    MyStatefulWidgetState createState() => MyStatefulWidgetState();
}
class MyStatefulWidgetState extends State<MyStatefulWidget> {
    bool isOpen = false;
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            theme: ThemeData(
                useMaterial3: false,
            ), home: Scaffold(
                appBar: AppBar(
                    title: Text(widget.title),
                ),
                body: Column(
                    children: [
                        Text("开关状态：${isOpen ? '开启' : '关闭'}"),
                        Switch(
                            value: isOpen,
                            onChanged: (change) {
                            setState(() {
                                isOpen = change;
                            });
                        })
                    ],
                ),
            ),
        );
    }
}
```

## StatefulWidget和StatelessWidget有哪些最佳实践

在开发widget时，需要考虑以下几点

1. 确定widget应该使用StatefulWidget还是StatelessWidget

    在Flutter中，widget是有状态的还是无状态的 - 取决于是否 他们依赖于状态的变化
        - 如果用户交互或数据改变导致widget改变，那么它就是有状态的
        - 如果一个widget是最终的或不可变的，那么它就是无状态

2. 确定哪个对象管理widget的状态（对于StatefulWidget）

    在Flutter中，管理状态有三种主要方式：
        - 每个widget管理自己的状态 
        - 父widget管理子widget的状态
        - 混合搭配管理的方法

    如何决定使用哪种方式时，可以参考以下原则：
        - 如果所讨论的状态是用户数据，例如复选框的已选中或未选中状态，或滑块的位置，则状态最好由父widget管理
        - 如果widget的状态取决于动作，例如动画，那么最好是由widget自身来管理状态
        - 如有还是不确定谁管理状态，请让父widget管理子widget的状态











