# 可滚动Widget

## 1. [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)

ListView 是一个用于创建可滚动列表的部件。它通常用于显示长列表的项目，可以垂直或水平滚动

```dart
ListView(
  children: <Widget>[
    Container(color: Colors.red, height: 200),
    Container(color: Colors.green, height: 200),
    Container(color: Colors.blue, height: 200),
    Container(color: Colors.yellow, height: 200),
    Container(color: Colors.orange, height: 200),
    Container(color: Colors.purple, height: 200),
  ],
)
```

## 2. [GridView](https://api.flutter.dev/flutter/widgets/GridView-class.html)

GridView 是一个用于创建可滚动网格的部件。它通常用于显示长列表的项目，可以垂直或水平滚动

```dart
GridView.count(
  crossAxisCount: 3,
  children: <Widget>[
    Container(color: Colors.red, height: 200),
    Container(color: Colors.green, height: 200),
    Container(color: Colors.blue, height: 200),
    Container(color: Colors.yellow, height: 200),
    Container(color: Colors.orange, height: 200),
    Container(color: Colors.purple, height: 200),
  ],
)
```

## 3. [NestScrollView](https://api.flutter.dev/flutter/widgets/CustomScrollView-class.html)

CustomScrollView 是一个用于创建可滚动视图的部件。它通常用于创建复杂的可滚动视图，可以包含多个可滚动部件

```dart
CustomScrollView(
  slivers: <Widget>[
    SliverAppBar(
      title: Text('CustomScrollView'),
      floating: true,
      expandedHeight: 200, // 设置展开高度
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            color: Colors.red,
            height: 200,
            child: Center(
              child: Text(
                '$index',
                style: TextStyle(color: Colors.white),
              ),
            ),
          );
        }, // 生成多少个item
        childCount: 20,
      ),
    ),
  ],
)
```

## 4. [CustomScrollView](https://api.flutter.dev/flutter/widgets/CustomScrollView-class.html)

CustomScrollView 是一个用于创建可滚动视图的部件。它通常用于创建复杂的可滚动视图，可以包含多个可滚动部件

```dart
CustomScrollView(
  slivers: <Widget>[
    SliverAppBar(
      title: Text('CustomScrollView'),
      floating: true, // 是否固定在顶部
      expandedHeight: 200, // 设置展开高度
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            color: Colors.red,
            height: 200,
            child: Center(
              child: Text(
                '$index',
                style: TextStyle(color: Colors.white),
              ),
            ),
          );
        }, // 生成多少个item
        childCount: 20,
      ),
    ),
  ],
)
```
