# 应用主结构Widget

## [MaterialApp](https://api.flutter.dev/flutter/material/MaterialApp-class.html)

MaterialApp 是一个方便的 Widget，它封装了应用程序实现 Material Design 风格应用所需的一些 Widget。

MaterialApp 是一个方便的 Widget，它封装了应用程序实现 Material Design 风格应用所需的一些 Widget。MaterialApp 会在其内部处理一些 Material Design 风格应用中需要的功能，如导航、主题、路由等。

MaterialApp 的主要属性如下：

- title：应用程序的名称，显示在任务管理器中。
- home：应用程序的首页，通常是一个 Scaffold。
- routes：应用程序的路由表，用于定义应用程序中各个页面的路径。例如，可以定义一个名为 "/home" 的路由，并将其与一个 Widget 关联起来。
- initialRoute：应用程序的初始路由，即应用程序启动后显示的页面。默认值为 "/"。
- onGenerateRoute：一个回调函数，用于生成应用程序的路由。当应用程序的路由表中没有找到对应的路由时，会调用这个回调函数。
- theme：应用程序的主题，用于定义应用程序中各个页面的颜色、字体等样式。
- darkTheme：应用程序的暗黑模式主题，用于定义应用程序在暗黑模式下的颜色、字体等样式。
- themeMode：应用程序的主题模式，可以是系统主题、暗黑主题或亮色主题。
- navigatorObservers：应用程序的路由观察者列表，用于监听应用程序的路由变化。

下面是一个使用 MaterialApp 的示例：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp( 
      title: 'My App', // 应用程序名称
      home: MyHomePage(),  // 应用程序首页
      routes: { // 路由
        '/home': (context) => MyHomePage(), // 首页
        '/settings': (context) => SettingsPage(), // 设置页
      },
      initialRoute: '/', // 初始路由
      onGenerateRoute: (settings) { // 当应用程序的路由表中没有找到对应的路由时，会调用这个回调函数
        if (settings.name == '/settings') { // 如果路由名称是 "/settings"
          return MaterialPageRoute(builder: (context) => SettingsPage()); // 返回一个 MaterialPageRoute，用于显示 SettingsPage
        }
        return null;
      },
      theme: ThemeData(primarySwatch: Colors.blue), // 主题
      darkTheme: ThemeData( // 暗黑主题
        brightness: Brightness.dark, // 定义主题的亮度
        primarySwatch: Colors.blue, // 定义主题的主色调
      ),
      themeMode: ThemeMode.system, // 主题模式
      navigatorObservers: [MyNavigatorObserver()], // 路由观察者
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(child: Text('Home Page')),
    );
  }
}

class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: Center(child: Text('Settings Page')),
    );
  }
}

class MyNavigatorObserver extends NavigatorObserver {
  @override
  void didPush(Route route, Route previousRoute) {
    print('didPush: ${route.settings.name}');
  }

  @override
  void didPop(Route route, Route previousRoute) {
    print('didPop: ${route.settings.name}');
  }
}
```

在这个示例中，我们创建了一个 MaterialApp，并定义了两个路由："/home" 和 "/settings"。我们还定义了一个初始路由 "/"，即应用程序启动后显示的页面。我们还定义了一个路由观察者 MyNavigatorObserver，用于监听应用程序的路由变化。

MaterialApp 是一个常用的 Widget，用于构建应用程序的主结构。它提供了一些常用的功能，如路由管理、主题定义等。通过使用 MaterialApp，我们可以更方便地构建应用程序的主结构。

## [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html)

Scaffold 是一个常用的 Widget，用于构建应用程序的页面结构。它提供了一些常用的功能，如导航栏、抽屉菜单、底部导航栏等。

下面是一个使用 Scaffold 的示例：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold( 
      appBar: AppBar(title: Text('Home')),  // 导航栏
      body: Center(child: Text('Home Page')), // 主页内容
      drawer: Drawer( // 抽屉菜单
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(child: Text('Drawer Header')),
            ListTile(
              title: Text('Item 1'),
              onTap: () {
                // Handle item 1 tap
              },
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {
                // Handle item 2 tap
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar( // 底部导航栏
        items: [BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings')],
        onTap: (index) {
          // Handle bottom navigation bar tap
        },
      ),
    );
  }
}
```

在这个示例中，我们创建了一个 Scaffold，并定义了导航栏、抽屉菜单和底部导航栏。我们还定义了应用程序的主页，即显示在 Scaffold 中的内容。

Scaffold 是一个常用的 Widget，用于构建应用程序的页面结构。通过使用 Scaffold，我们可以更方便地构建应用程序的页面结构，如导航栏、抽屉菜单、底部导航栏等。
