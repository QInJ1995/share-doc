# flutter_hi_cache

[`flutter_hi_cache`](https://pub.dev/packages/flutter_hi_cache) 是一个轻量级的 Flutter 缓存库，它提供了一种简单的方式来缓存数据，包括文件、图片、JSON 等。

## 安装

```bash
flutter pub add flutter_hi_cache
```

## 使用

### 基本用法

```dart
import 'package:flutter_hi_cache/flutter_hi_cache.dart';

// 缓存数据
Future<void> cacheData() async {
  final cache = HiCache();
  final data = await cache.get('data_key');
  if (data == null) {
    // 数据不存在，进行缓存
    final response = await Dio().get('https://example.com/data');
    await cache.put('data_key', response.data);
  } else {
    // 数据存在，直接使用
    // ...
  }
}
```

### 文件缓存

```dart
import 'package:flutter_hi_cache/flutter_hi_cache.dart';

// 缓存文件
Future<void> cacheFile() async {
  final cache = HiCache.file();
  final file = await cache.get('file_key');
  if (file == null) {
    // 文件不存在，进行缓存
    final response = await Dio().get('https://example.com/file');
    await cache.put('file_key', response.data);
  } else {
    // 文件存在，直接使用
    // ...
  }
}
```

### 图片缓存

```dart
import 'package:flutter_hi_cache/flutter_hi_cache.dart';

// 缓存图片
Future<void> cacheImage() async {
  final cache = HiCache.image();
  final image = await cache.get('image_key');
  if (image == null) {
    // 图片不存在，进行缓存
    final response = await Dio().get('https://example.com/image');
    await cache.put('image_key', response.data);
  } else {
    // 图片存在，直接使用
    // ...
  }
}
```

### JSON 缓存

```dart
import 'package:flutter_hi_cache/flutter_hi_cache.dart';

// 缓存 JSON
Future<void> cacheJson() async {
  final cache = HiCache.json();
  final json = await cache.get('json_key');
  if (json == null) {
    // JSON 不存在，进行缓存
    final response = await Dio().get('https://example.com/json');
    await cache.put('json_key', response.data);
  } else {
    // JSON 存在，直接使用
    // ...
  }
}
```

## 注意事项

- `flutter_hi_cache` 只是一个简单的缓存库，它不提供数据持久化功能，如果需要持久化数据，请使用其他库，如 `shared_preferences`。
- `flutter_hi_cache` 不支持并发操作，如果需要并发操作，请使用其他库，如 `dio`。

## 参考

- [flutter_hi_cache](https://pub.dev/packages/flutter_hi_cache)

## 总结

`flutter_hi_cache` 是一个轻量级的 Flutter 缓存库，它提供了一种简单的方式来缓存数据，包括文件、图片、JSON 等。使用起来非常方便，只需要几行代码就可以实现数据的缓存和读取。
