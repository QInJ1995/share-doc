# JSON解析与Dart Model的使用

虽然发出网络请求很简单，但如果要使用原始的`Future<http.Response>`并不简单。为了让我们可以开开心心的写代码，我们
可以将`http.Response`中返回的JSON格式的数据转换成我们自己的Dart对象。

JSON是一种轻量级的数据交换语言，在网络编程中大量的用到了JSON来作为传输数据的格式，那么在Flutter中是如何处理
JSON数据，以及JSON数据处理有那些实用技巧呢？

## 如何解析JSON数据？

在Flutter中解析JSON数据主要有两种方式：

1. 将json string转成Map；
2. 将json string转成Dart Model类；
    什么是Dart Model类

### 将json string转成Map

主要步骤：
1. 导入dart:convert
    import 'dart:convert';
2. 通过jsonDecode(jsonString)将json转成Map；
3. 使用Map中的数据；

```dart
import 'dart:convert';//导入`dart:convert`
//json转map并解析数据
void _json2Map() {
    var jsonString =
    '{"code":0,"data":{"code":0,"method":"GET","requestPrams":"11"},"msg":"SUCCESS."}';
    Map<String, dynamic> map = jsonDecode(jsonString);//将json转成Map；
    setState(() {
        resultShow =
        'code: ${map['code']};requestPrams:${map['data']['requestPrams']}';//使用Map中的数据
    });
}
```

### 将json string转成Dart Model类

通过上述方式可以将json字符串转换成Map，但Map中存放那些字段在使用的时候很不方便。

为了提高字段获取的效率，目前常用的方案是将json string转成Dart Model类，不仅可以提高字段获取的效率，而且方便字段的
后期维护和扩展。

::: 小知识：什么是Dart Model类？
实体类可以理解为一种数据的载体，主要是作为数据管理和业务逻辑处理层面上存在的类别。比如：我们将从数据库中或服务
端接口中读取到的用户信息转成一个User类来存储；然后在需要的时候获取User类的属性并将其展示在界面上等。
:::

## 如何将json string转成Dart Model

主要步骤：

1. 定义Dart Model
2. 将json string转成Map（可借助jsonDecode完成）
3. 将Map转成Dart Model

在定义Dart Model前我们先来了解下Dart Model的格式要求：

Dart Model格式要求:

1. 字段不能为私有（既字段前不能有下划线）；
2. 普通构造函数；
3. 声明为XXX.fromJson的命名构造函数；
4. 声明为`Map<String, dynamic>` toJson成员函数；

```dart
class Data {
    int? code;
    String? method;
    String? requestPrams;
    Data({this.code, this.method, this.requestPrams});
    Data.fromJson(Map<String, dynamic> json) {
        code = json['code'];
        method = json['method'];
        requestPrams = json['requestPrams'];
    }
    Map<String, dynamic> toJson() {
        final Map<String, dynamic> data = <String, dynamic>{};
        data['code'] = code;
        data['method'] = method;
        data['requestPrams'] = requestPrams;
        return data;
    }
}
```

### 将json string转成Dart Model的几种常见的方式

- 手动转换：适用于简单的json string；
    可参考上面的示例代码进行手动转换；
- 在线转换：简单和负责的json string都适用（推荐）；
    借助[在线转换](https://json.flutterschool.cn/)的方式更加灵活高效；

可以根据需要选择上面的其中一种方式来定义Dart Model的。

## Dart Model的使用

定义好Dart Model之后接下来我们来看下如何使用它：


1. 使用dart:convert 中的jsonDecode将json string转成Map
2. 通过DataModel.fromJson将Map转成Dart Model

```dart
//json转Model
void _json2Model() {
    var jsonString = '{"code":0,"data":{"code":0,"method":"GET","requestPrams":"11"},"msg":"SUCCESS."}';
    Map<String, dynamic> map = jsonDecode(jsonString); //将json转成Map；
    DataModel model = DataModel.fromJson(map); //将Map转成Dart Model
    setState(() {
        resultShow =
        'code: ${model.code};requestPrams:${model.data?.requestPrams}'; //使用Map中的数据
    });
}
```
