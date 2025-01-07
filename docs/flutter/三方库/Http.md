# Http

## 什么是Http库

Http库是Flutter社区开发的一个可组合的、跨平台的用于Flutter的网络请求插件。

## 如何使用Http库

### 第一步：添加依赖

在pubspec.yaml中引入[http](https://pub.dev/packages/http)插件

```yaml
dependencies:
http: <latest_version>
```

### 第二步：导入http

在dart文件中导入

```dart
import 'package:http/http.dart' as http;
```

## 使用http库做get请求

调用http.get发送请求

```dart
///发送Get请求
_doGet() async {
    var uri = Uri.parse('api/test/test?requestPrams=123');
    var response = await http.get(uri);
    //http请求成功
    if (response.statusCode == 200) {
        setState(() {
            resultShow = response.body;
        });
    } else {
    setState(() {
            resultShow = "请求失败：code: ${response.statusCode}，body:${response.body}";
        });
    }
}
```

http.get()返回一个包含http.Response的Future：

- [Future](https://api.flutter.dev/flutter/dart-async/Future-class.html)：是与异步操作一起工作的核心Dart类，它用于表示未来某个时间可能会出现的可用值或错误；
- http.Response：类包含一个成功的HTTP请求接收到的数据；
- response.statusCode：通过statusCode可以获取http请求状态码，200代表请求成功；
- response.body：通过body获取返回的数据；

## 如何用http库做post请求

调用http.post发送请求

使用post传递的数据常用的内容类型主要有两种：

- x-www-form-urlencoded
- application/json

### 发送x-www-form-urlencoded（后面简称form类型）类型的数据

form类型是post请求中较为常见的一种内容类型，也是http库默认的内容类型。

注意：body必须为`Map<String, String>`类型。

```dart
_doPost() async {
    var uri = Uri.parse('api/test/test');
    var params = {"requestPrams": "doPost"};//数据格式必须为Map<String, String>
    var response = await http.post(uri, body: params); //默认为x-www-form-urlencoded 格式，所以可以不用设置content-type
    //http请求成功
    if (response.statusCode == 200) {
        setState(() {
            resultShow = response.body;
        });
    } else {
        setState(() {
            resultShow = "请求失败：code: ${response.statusCode}，body:${response.body}";
        });
    }
}
```

http.post()返回一个包含http.Response的Future：

- Future：是与异步操作一起工作的核心Dart类。它用于表示未来某个时间可能会出现的可用值或错误；
- http.Response：类包含一个成功的HTTP请求接收到的数据；

### 发送application/json（后面简称json类型）类型的数据

要发送json类型的数据，主要有以下步骤：

1. 将数据转换为json String，可以利用jsonEncode()来转；
2. 将json数据赋值给body参数；
3. 在header中设置content-type为application/json；

```dart
///发送Json类型的Post请求
_doPostJson() async {
    var uri = Uri.parse('api/test/testJson');
    var params = {"requestPrams": "doPost"};
    var response = await http.post(uri, body: jsonEncode(params), //将数据转成string
    headers: {
        //设置content-type为application/json
        "content-type": "application/json"
    });
    //http请求成功
    if (response.statusCode == 200) {
        setState(() {
            resultShow = response.body;
        });
    } else {
    setState(() {
        resultShow = "请求失败：code: ${response.statusCode}，body:${response.body}";
    });
    }
}
```

## 如何将Response转换成Dart object

第一步：通过response.body获取接口返回的json string

前提是接口返回的是json格式的数据。

```dart
var jsonString = response.body;
```

第二步：使用dart:convert 中的 `jsonDecode` 将 `json string` 转成 `Map`

```dart
var jsonString = response.body;
var map = jsonDecode(jsonString);
```

现在呢，我们已经将Response转换成Dart object了。

接下来就可以取出map中的数据来使用了：

```dart
var jsonString = response.body;
var map = jsonDecode(jsonString);
setState(() {
    resultShow2 = map['msg'];
});
```



