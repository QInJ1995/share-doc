# 图片和资产Widget

## 1. [Image](https://api.flutter.dev/flutter/widgets/Image-class.html)

Image 是一个显示图片的 Widget，它有多种构造函数，可以用来从不同的源加载图片。

### 1.1. 从网络加载图片

```dart
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```

### 1.2. 从本地文件加载图片

```dart
Image.asset(
  'assets/images/avatar.jpg',
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```

### 1.3. 从内存加载图片

```dart
Image.memory(
  bytes,
  width: 200.0, height: 200.0,
  fit: BoxFit.cover,
),
```

### 1.4. 从文件加载图片

```dart
Image.file(
  File('path/to/image.jpg'),
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```

## 2. [Icon](https://api.flutter.dev/flutter/widgets/Icon-class.html)

Icon 是一个显示图标的 Widget，它有多种构造函数，可以用来从不同的源加载图标。

```dart
Icon(
  Icons.star,
  color: Colors.red,
  size: 50.0,
),
```

## 3. [RawImage](https://api.flutter.dev/flutter/widgets/RawImage-class.html)

RawImage 是一个显示原始图像数据的 Widget，它可以直接从内存中加载图像数据，而不需要经过解码。

```dart
RawImage(
  image: image,
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```

## 4. [AssetBuilder](https://api.flutter.dev/flutter/widgets/AssetBuilder-class.html)

AssetBuilder 是一个用于加载资产的 Widget，它可以将资产加载为图像、音频、视频等。

```dart
AssetBuilder(
  asset: 'assets/images/avatar.jpg',
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```

## 5. [AssetImage](https://api.flutter.dev/flutter/widgets/AssetImage-class.html)

AssetImage 是一个用于加载资产的 Widget，它可以将资产加载为图像。

```dart
AssetImage(
  'assets/images/avatar.jpg',
  width: 200.0,
  height: 200.0,
  fit: BoxFit.cover,
),
```
