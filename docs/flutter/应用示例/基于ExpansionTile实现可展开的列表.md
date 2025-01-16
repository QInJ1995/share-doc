# 基于ExpansionTile实现可展开的列表

[ExpansionTile](https://api.flutter.dev/flutter/material/ExpansionTile-class.html)是Flutter中一个可展开的列表组件，类似于Android中的ExpandableListView，可以展开和折叠子项。

## 代码

```dart
import 'package:flutter/material.dart';

class ExpansionTileDemo extends StatefulWidget {
  @override
  _ExpansionTileDemoState createState() => _ExpansionTileDemoState();
}

class _ExpansionTileDemoState extends State<ExpansionTileDemo> {
  List<Widget> _list = [];
  List<Widget> _list2 = [];

  @override
  void initState() {
    super.initState();
    _list.add(_getExpansionTile('1', 'title1'));
    _list.add(_getExpansionTile('2', 'title2'));
    _list.add(_getExpansionTile('3', 'title3'));
    _list2.add(_getExpansionTile('4', 'title4'));
    _list2.add(_getExpansionTile('5', 'title5'));
    _list2.add(_getExpansionTile('6', 'title6'));
  }

  Widget _getExpansionTile(String id, String title) {
    return ExpansionTile(
      key: Key(id),
      title: Text(title),
      children: <Widget>[
        ListTile(
          title: Text('content'),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ExpansionTileDemo'),
      ),
      body: ListView(children: <Widget>[
        ExpansionTile(
          title: Text('title'),
          children: <Widget>[
            ListTile(
              title: Text('content'),
            ),
          ],
        ),
        ExpansionTile(
          title: Text('title'),
          children: <Widget>[
            ListTile(
              title: Text('content'),
            ),
          ],
        ),
        ExpansionTile(
          title: Text('title'),
          children: <Widget>[
            ListTile(
              title: Text('content'),
            ),
          ],
        ),
        ExpansionTile(
          title: Text('title'),
          children: <Widget>[
            ListTile(
              title: Text('content'),
            ),
          ],
        ),
      ]),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: ExpansionTileDemo(),
  ));
}
```
