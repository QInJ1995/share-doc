# dio

[`dio`](https://pub.dev/packages/dio) 是一个强大的Dart Http客户端，支持Restful API、拦截器、全局配置、FormData、请求取消、文件下载、超时等。

## 1. 安装

```dart
dependencies:
  dio: ^4.0.0
```

## 2. 使用

### 2.1. 发起GET请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();
  Response response = await dio.get('https://www.baidu.com');
  print(response.data);
}
```

### 2.2. 发起POST请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  FormData formData = FormData.fromMap({
    'name': 'dio',
    'age': 18,
  });

  Response response = await dio.post('https://www.baidu.com', data: formData);
  print(response.data);
}
```

### 2.3. 发起PUT请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  FormData formData = FormData.fromMap({
    'name': 'dio',
    'age': 18,
  });

  Response response = await dio.put('https://www.baidu.com', data: formData);
  print(response.data);
}
```

### 2.4. 发起DELETE请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  FormData formData = FormData.fromMap({
    'name': 'dio',
    'age': 18,
  });

  Response response = await dio.delete('https://www.baidu.com', data: formData);
  print(response.data);
}
```

### 2.5. 发起下载请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  Response response = await dio.download('https://www.baidu.com', '/Users/xxx/Downloads/baidu.html');
  print(response.data);
}
```

### 2.6. 发起上传请求

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  FormData formData = FormData.fromMap({
    'file': await MultipartFile.fromFile('/Users/xxx/Downloads/baidu.html'),
  });

  Response response = await dio.post('https://www.baidu.com', data: formData);
  print(response.data);
}
```

### 2.7. 拦截器

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) {
      // 在请求被发送之前做一些事情
      return handler.next(options); // continue
    },
    onResponse: (response, handler) {
      // 在返回响应数据之前做一些事情
      return handler.next(response); // continue
    },
    onError: (DioError e, handler) {
      // 当请求失败时做一些事情
      return handler.next(e); // continue
    },
  ));

  Response response = await dio.get('https://www.baidu.com');
  print(response.data);
}
```

### 2.8. 全局配置

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  dio.options.baseUrl = 'https://www.baidu.com';
  dio.options.connectTimeout = 5000;
  dio.options.receiveTimeout = 5000;

  Response response = await dio.get('/');

  print(response.data);
}
```

### 2.9. 请求取消

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  CancelToken cancelToken = CancelToken();

  Response response = await dio.get('https://www.baidu.com', cancelToken: cancelToken);

  print(response.data);
}
```

### 2.10. 超时

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  dio.options.connectTimeout = 5000;
  dio.options.receiveTimeout = 5000;

  Response response = await dio.get('https://www.baidu.com');

  print(response.data);
}
```

### 2.11. 处理错误

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  try {
    Response response = await dio.get('https://www.baidu.com');
    print(response.data);
  } catch (e) {
    print(e);
  }
}
```

### 2.12. 处理响应

```dart
import 'package:dio/dio.dart';

void main() async {
  Dio dio = Dio();

  Response response = await dio.get('https://www.baidu.com');

  print(response.data);
  print(response.headers);
  print(response.statusCode);
  print(response.statusMessage);
  print(response.requestOptions);
  print(response.redirects);
  print(response.extra);
  print(response.isRedirect);
  print(response.isError);
  print(response.error);
  print(response.realUri);
  print(response.rawHeaders);
  print(response.rawData);
}
```
