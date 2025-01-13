# carousel_slider

## 简介

[carousel_slider](https://pub.dev/packages/carousel_slider) 是一个用于实现轮播图的 Flutter 插件。

## 使用

```dart
import 'package:carousel_slider/carousel_slider.dart';

class CarouselSliderDemo extends StatefulWidget {
  @override
  _CarouselSliderDemoState createState() => _CarouselSliderDemoState();
}

class _CarouselSliderDemoState extends State<CarouselSliderDemo> {
  int _currentIndex = 0;
  List<String> _imageUrls = [
    'https://picsum.photos/250?image=9',
    'https://picsum.photos/250?image=10',
    'https://picsum.photos/250?image=11',
    'https://picsum.photos/250?image=12',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CarouselSliderDemo'),
      ),
      body: Column(
        children: [
          CarouselSlider(
            items: _imageUrls.map((url) {
              return Image.network(
                url,
                fit: BoxFit.cover,
                width: double.infinity,
              );
            }).toList(), // 指定图片列表
            options: CarouselOptions(
              height: 200.0, // 指定轮播图的高度
              autoPlay: true, // 自动播放
              enlargeCenterPage: true, // 居中显示
              onPageChanged: (index, reason) {
                setState(() {
                  _currentIndex = index;
                });
              },
            ),
          ), // 指定轮播图的选项
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: _imageUrls.map((url) {
              int index = _imageUrls.indexOf(url);
              return Container(
                width: 8.0,
                height: 8.0,
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0), // 指定圆点之间的间距
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _currentIndex == index
                      ? Colors.blue // 当前选中的圆点颜色
                      : Colors.grey, // 未选中的圆点颜色
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
```

## 选项

- `height`: 轮播图的高度。
- `autoPlay`: 是否自动播放。
- `autoPlayInterval`: 自动播放的时间间隔。
- `autoPlayAnimationDuration`: 自动播放动画的持续时间。
- `autoPlayCurve`: 自动播放动画的曲线。
- `pauseAutoPlayOnTouch`: 在触摸时暂停自动播放。
- `enlargeCenterPage`: 居中显示。
- `aspectRatio`: 宽高比。
- `initialPage`: 初始页码。
- `enableInfiniteScroll`: 是否启用无限滚动。
- `reverse`: 是否反向滚动。
- `pageSnapping`: 是否启用页面捕捉。
- `viewportFraction`: 视口比例。
- `onPageChanged`: 页面改变时的回调函数。
- `scrollDirection`: 滚动方向。
- `enableVerticalDrag`: 是否启用垂直拖动。
- `enableHorizontalDrag`: 是否启用水平拖动。
- `scrollPhysics`: 滚动物理效果。

## 示例

```dart
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CarouselSlider Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CarouselSliderDemo(),
    );
  }
}

class CarouselSliderDemo extends StatefulWidget {
  @override
  _CarouselSliderDemoState createState() => _CarouselSliderDemoState();
}

class _CarouselSliderDemoState extends State<CarouselSliderDemo> {
  final List<String> _imageUrls = [
    'https://example.com/image1.jpg', // 替换为你的图片URL
    'https://example.com/image2.jpg', // 替换为你的图片URL
    'https://example.com/image3.jpg', // 替换为你的图片URL
  ];

  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CarouselSlider Demo'),
      ),
      body: Column(
        children: [
          CarouselSlider(
            items: _imageUrls.map((url) {
              return Image.network(
                url,
                fit: BoxFit.cover,
                width: double.infinity,
              );
            }).toList(),
            options: CarouselOptions(
              height: 200.0,
              autoPlay: true, // 自动播放
              autoPlayInterval: Duration(seconds: 3), // 自动播放间隔
              autoPlayAnimationDuration: Duration(milliseconds: 800), // 自动播放动画持续时间
              autoPlayCurve: Curves.easeInOut, // 自动播放动画曲线
              pauseAutoPlayOnTouch: true, // 触摸时暂停自动播放
              enlargeCenterPage: true, // 居中显示
              aspectRatio: 16 / 9, // 宽高比
              initialPage: 0, // 初始页码
              enableInfiniteScroll: true, // 启用无限滚动
              reverse: false, // 反向滚动
              pageSnapping: true, // 页面捕捉
              onPageChanged: (index, reason) {
                setState(() {
                  _currentIndex = index;
                });
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: _imageUrls.map((url) {
              int index = _imageUrls.indexOf(url);
              return Container(
                width: 8.0,
                height: 8.0, // 圆点大小
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _currentIndex == index ? Colors.blue : Colors.grey,
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
```

在这个示例中，我们创建了一个包含三个图片URL的列表 `_imageUrls`。然后，我们使用 `CarouselSlider` 小部件来显示这些图片，并使用 `CarouselOptions` 来配置轮播图的行为。我们还创建了一个包含圆点的行，用于指示当前显示的图片。
