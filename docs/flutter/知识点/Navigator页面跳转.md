# Navigator页面跳转

我们可以通过封装 Flutter 的 Navigator.push、Navigator.pushNamed 或 Navigator.pushReplacement 等方法来实现。

## 基本的封装页面跳转

首先，你可以封装一个 `Navigator.push` 方法，以便在应用中使用时更方便。

封装 `push` 跳转

```dart
import 'package:flutter/material.dart';

// 封装页面跳转的函数
void navigateTo(BuildContext context, Widget page) {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => page),
  );
}
```

然后在其他地方使用：

```dart
// 在页面中调用跳转
navigateTo(context, SecondPage());
```

### 使用命名路由进行跳转

如果你使用的是命名路由，可以将 `Navigator.pushNamed` 进行封装：

```dart
import 'package:flutter/material.dart';

// 封装命名路由跳转
void navigateToNamed(BuildContext context, String routeName) {
  Navigator.pushNamed(context, routeName);
}
```

调用时：

```dart
// 在页面中调用命名路由跳转
navigateToNamed(context, '/second');
```

## 封装带参数的页面跳转

有时你可能需要在页面跳转时传递一些参数，可以通过`Navigator.push` 的 `arguments` 或构造函数来传递数据。

示例：传递参数

```dart
// 假设我们要跳转到一个 SecondPage，且需要传递一个参数
void navigateToWithParams(BuildContext context, String param) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => SecondPage(param: param),
    ),
  );
}
```

然后在 `SecondPage` 中接收这个参数：

```dart
class SecondPage extends StatelessWidget {
  final String param;

  // 构造函数接收参数
  SecondPage({required this.param});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Second Page")),
      body: Center(child: Text("Received Param: $param")),
    );
  }
}
```

调用时：

```dart
// 在页面中调用跳转并传递参数
navigateToWithParams(context, 'Hello from FirstPage');
```

### 使用命名路由传递参数

如果使用命名路由，也可以通过 `arguments` 传递参数：

```dart
// 封装命名路由并传递参数
void navigateToNamedWithParams(BuildContext context, String routeName, Object arguments) {
  Navigator.pushNamed(context, routeName, arguments: arguments);
}
```

然后在接收页面中获取传递的参数：

```dart
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as String;

    return Scaffold(
      appBar: AppBar(title: Text("Second Page")),
      body: Center(child: Text("Received Param: $args")),
    );
  }
}
```

调用时：

```dart
// 在页面中调用命名路由并传递参数
navigateToNamedWithParams(context, '/second', 'Hello from FirstPage');
```

## 封装带返回值的页面跳转

有时你需要从下一个页面返回一个结果。你可以封装 `Navigator.push` 或 `Navigator.pushNamed` 并通过 `await` 等待返回结果。

示例：页面返回数据

```dart
// 封装返回值的跳转
Future<String> navigateToAndReceiveData(BuildContext context) async {
  final result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SecondPage()),
  );
  return result;  // 返回结果
}
```

在目标页面中，返回数据：

```dart
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Second Page")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // 返回结果
            Navigator.pop(context, 'Hello from Second Page');
          },
          child: Text('Go Back with Data'),
        ),
      ),
    );
  }
}
```

然后在调用页面中获取返回值：

```dart
// 在页面中调用跳转并接收返回数据
String result = await navigateToAndReceiveData(context);
print(result);  // 输出：Hello from Second Page
```

## 封装页面替换跳转（`pushReplacement`）

有时你不需要保留当前页面栈，只想跳转并替换当前页面。这时可以使用 `Navigator.pushReplacement`。

```dart
// 封装替换页面的跳转
void replaceWithPage(BuildContext context, Widget page) {
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => page),
  );
}
```

调用时：

```dart
// 在页面中调用替换跳转
replaceWithPage(context, SecondPage());
```

## 封装 pop 返回

如果你需要封装返回操作，可以创建一个 pop 方法：

```dart
void goBack(BuildContext context) {
  Navigator.pop(context);
}
```

调用时：

```dart
// 在页面中调用返回
goBack(context);
```

## 总结

通过封装页面跳转方法，可以简化代码并提高可维护性。你可以根据需要封装不同的跳转方式，如普通跳转、带参数跳转、带返回值的跳转、替换页面跳转等。
