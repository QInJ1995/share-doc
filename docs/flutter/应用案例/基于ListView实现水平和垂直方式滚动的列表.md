# 基于ListView实现水平和垂直方式滚动的列表

[ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)是Flutter中常用的滚动控件，可以用于实现水平和垂直方式滚动的列表。

## 垂直滚动列表

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('垂直滚动列表'),
        ),
        body: ListView(
          children: <Widget>[
            ListTile(
              leading: Icon(Icons.star),
              title: Text('列表项1'),
            ),
            ListTile(
              leading: Icon(Icons.star),
              title: Text('列表项2'),
            ),
            ListTile(
              leading: Icon(Icons.star),
              title: Text('列表项3'),
            ),
            ListTile(
              leading: Icon(Icons.star),
              title: Text('列表项4'),
            ),
            ListTile(
              leading: Icon(Icons.star),
              title: Text('列表项5'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 水平滚动列表

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('水平滚动列表'),
        ),
        body: ListView(
          scrollDirection: Axis.horizontal,
          children: <Widget>[
            Container(
              width: 200,
              color: Colors.red,
              child: Center(child: Text('列表项1')),
            ),
            Container(
              width: 200,
              color: Colors.blue,
              child: Center(child: Text('列表项2')),
            ),
            Container(
              width: 200,
              color: Colors.green,
              child: Center(child: Text('列表项3')),
            ),
            Container(
              width: 200,
              color: Colors.yellow,
              child: Center(child: Text('列表项4')),
            ),
            Container(
              width: 200,
              color: Colors.orange,
              child: Center(child: Text('列表项5')),
            ),
          ],
        ),
      ),
    );
  }
}
```
