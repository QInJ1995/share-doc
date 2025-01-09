# Future与FutureBuilder实用技巧

## 什么是Future

Future表示在接下来的某个时间的值或错误，借助Future我们可以在Flutter实现异步操作。

它类似于ES6中的Promise，提供then和catchError的链式调用；

Future是dart:async包中的一个类，使用它时需要导入dart:async包，Future有两种状态：

- pending - 执行中；
- completed - 执行结束，分两种情况要么成功要么失败；

## Future的常见用法

- 使用future.then获取future的值与捕获future的异常
- 结合async,await
- future.whenComplete
- future.timeout

### 使用future.then获取future的值与捕获future的异常

```dart
import 'dart:async';
Future<String> testFuture() {
    // throw new Error();
    return Future.value('success');
    // return Future.error('error');
}
main() {
    testFuture().then((s) {
        print(s);
    }, onError: (e) {
        print('onError:');
        print(e);
    }).catchError((e) {
        print('catchError:');
        print(e);
    });
}
```

如果catchError与onError同时存在，则会只调用onError；

Future的then的原型：

`Future<R> then<R>(FutureOr<R> onValue(T value), {Function onError})`;

第一个参数会成功的结果回调，第二个参数onError可选表示执行出现异常。

### 结合async await

Future是异步的，如果我们要将异步转同步，那么可以借助async await来完成。

```dart
import 'dart:async';

test() async {
    int result = await Future.delayed(const Duration(milliseconds: 2000), () {
        return Future.value(123);
    });
    print('t3:' + DateTime.now().toString());
    print(result);
}
main() {
    print('t1:' + DateTime.now().toString());
    test();
    print('t2:' + DateTime.now().toString());
}
```

### future.whenComplete

有时候我们需要在Future结束的时候做些事情，我们知道then().catchError()的模式类似于try-catch，try-catch有
个finally代码块，而future.whenComplete就是Future的finally。

```dart
import 'dart:async';
import 'dart:math';
void main() {
    var random = Random();
    Future.delayed(const Duration(seconds: 3), () {
        if (random.nextBool()) {
            return 100;
        } else {
            throw 'boom!';
        }
    }).then(print).catchError(print).whenComplete(() {
        print('done!');
    });
}
```

### future.timeout

完成一个异步操作可能需要很长的时间，比如：网络请求，但有时我们需要为异步操作设置一个超时时间，那么，如何
为Future设置超时时间呢？

```dart
import 'dart:async';
void main() {
    Future.delayed(const Duration(seconds: 3), () {
        return 1;
    }).timeout(const Duration(seconds: 2)).then(print).catchError(print);
}
```

运行上述代码会看到：TimeoutException after 0:00:02.000000: Future not completed。

## 什么是FutureBuilder

FutureBuilder是一个将异步操作和异步UI更新结合在一起的类，通过它我们可以将网络请求，数据库读取等的结果更新的页
面上。

### FutureBuilder的构造方法

`FutureBuilder({Key key, Future<T> future, T initialData, @required AsyncWidgetBuilder<T> builder })`

- future： Future对象表示此构建器当前连接的异步计算；
- initialData： 表示一个非空的Future完成前的初始化数据；
- builder： AsyncWidgetBuilder类型的回到函数，是一个基于异步交互构建widget的函数；

这个builder函数接受两个参数`BuildContext context` 与 `AsyncSnapshot<T> snapshot`，它返回一个`widget`。`AsyncSnapshot`包含异步计算的信息，它具有以下属性：

- connectionState：枚举ConnectionState的值，表示与异步计算的连接状态，ConnectionState有四个值：none，waiting，active和done；
  - none：当前未连接到任何异步计算；
  - waiting：连接到异步计算并等待交互；
  - active：表示异步计算还在进行中；
  - done：表示异步计算完成；

- data - 异步计算接收的最新数据；
- error - 异步计算接收的最新错误对象；

AsyncSnapshot还具有hasData和hasError属性，以分别检查它是否包含非空数据值或错误值。

现在我们可以看到使用FutureBuilder的基本模式。 在创建新的FutureBuilder对象时，我们将Future对象作为要处理的异步计算传递。 在构建器函数中，我们检查connectionState的值，并使用AsyncSnapshot中的数据或错误返回不同的窗口小部件。

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_net_storage/data_model.dart';
import 'package:http/http.dart' as http;
///Future与FutureBuilder实战应用
class FutureStudy extends StatefulWidget {
    const FutureStudy({super.key});
    @override
    State<StatefulWidget> createState() => _FutureStudyState();
}
class _FutureStudyState extends State<FutureStudy> {
    String showResult = '';
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            theme: ThemeData(useMaterial3: false),
            home: Scaffold(
                appBar: AppBar(
                    title: const Text('Future与FutureBuilder实用技巧'),
                ),
                body: FutureBuilder<DataModel>(
                future: fetchGet(),
                builder: (BuildContext context, AsyncSnapshot<DataModel> snapshot) {
                    switch (snapshot.connectionState) {
                        case ConnectionState.none:
                        return const Text('state none');
                        case ConnectionState.waiting:
                        return const Center(child: CircularProgressIndicator());
                        case ConnectionState.active:
                        return const Text('state active');
                        case ConnectionState.done:
                        if (snapshot.hasError) {
                            return Text(
                                '${snapshot.error}',
                                style: const TextStyle(color: Colors.red),
                            );
                        } else {
                            return Column(children: <Widget>[
                                Text('code:${snapshot.data?.code}'),
                                Text('requestPrams:${snapshot.data?.data?.requestPrams}'),
                            ]);
                        }
                    }
                }),
            ),
        );
    }
    Future<DataModel> fetchGet() async {
        var uri =
        Uri.parse("https://api.geekailab.com/uapi/test/test?requestPrams=11");
        final response = await http.get(uri);
        Utf8Decoder utf8decoder = const Utf8Decoder(); //fix 中文乱码
        var result = json.decode(utf8decoder.convert(response.bodyBytes));
        return DataModel.fromJson(result);
    }
}
```
