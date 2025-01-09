# Hive

在 Flutter 中，Hive 是一个轻量级且高效的本地数据库，适合用于存储简单的数据，比如键值对数据或小型数据模型。它不依赖于 SQLite，且提供了非常高的性能，尤其适合存储不需要复杂查询操作的数据。

## 1. 安装 Hive

### 1.1 添加依赖

要在 Flutter 中使用 Hive，你需要将 [`hive`](https://pub.dev/packages/hive)，[`hive_flutter`](https://pub.dev/packages/hive_flutter) 库添加到 `pubspec.yaml` 文件中。

打开 `pubspec.yaml` 文件，在 `dependencies` 中添加：

```yaml
dependencies:
  flutter:
    sdk: flutter
  hive: ^2.0.4  # 添加 Hive 库
  hive_flutter: ^1.1.0  # Flutter 环境下使用 Hive 的支持库（可选）
```

然后执行命令来安装依赖：

```bash
flutter pub get
```

### 1.2 添加 Hive 存储引擎

Hive 默认使用内存存储，但如果你希望将数据保存在磁盘上，需要配置路径。在 `pubspec.yaml` 中添加 [`path_provider`](https://pub.dev/packages/path_provider) 库来获得设备的目录路径：

```yaml
dependencies:
  path_provider: ^2.0.11
```

执行命令安装依赖：

```bash
flutter pub get
```

## 2. 初始化 Hive

在应用启动时，你需要初始化 Hive。

### 2.1 初始化 Hive

在 `main.dart` 文件中，你需要在 `runApp()` 之前初始化 Hive。通常情况下，你会将 Hive 的初始化放到 `main()` 方法中，并确保 Hive 在应用启动时就已经准备好。

```dart
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  // 确保 Hive 初始化
  await Hive.initFlutter();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}
```

## 3. 使用 Hive 存储数据

### 3.1 打开一个 Hive Box

Hive 中的数据是保存在称为 Box 的容器中的。你可以将一个 Box 看作是一个字典，它将键值对存储在其中。

打开一个 Box 时需要指定 Box 的名称，并且可以通过 `openBox` 来打开。

```dart
var box = await Hive.openBox('myBox');
```

### 3.2 存储数据

Hive 通过键值对的形式存储数据。你可以像操作 `Map` 一样进行存取数据。

```dart
// 存储数据
box.put('name', 'Flutter');
box.put('age', 25);

// 存储列表或复杂数据
List<String> items = ['apple', 'banana', 'cherry'];
box.put('fruits', items);
```

### 3.3 读取数据

你可以通过键来访问存储在 Box 中的数据。如果数据不存在，get 方法会返回 null。

```dart
var name = box.get('name');  // 'Flutter'
var age = box.get('age');    // 25
var fruits = box.get('fruits'); // ['apple', 'banana', 'cherry']
```

### 3.4 删除数据

如果你不再需要某个键值对，可以通过 delete 方法删除。

```dart
box.delete('name');
```

### 3.5 获取所有键值对

你可以通过 toMap() 获取所有存储在 Box 中的数据。

```dart
Map<String, dynamic> allData = box.toMap();
print(allData);
```

## 4. Hive 数据模型

如果你想要存储更复杂的对象，可以将对象映射为 Hive 数据模型。你需要创建一个类，并使其适配 Hive。

### 4.1 定义数据模型

首先创建一个模型类，并使用 `@HiveType` 和 `@HiveField` 注解标记字段。

```dart
import 'package:hive/hive.dart';

part 'person.g.dart';  // 需要运行 build_runner 生成 g.dart 文件

@HiveType(typeId: 0)  // 每个模型必须有一个唯一的 typeId
class Person {
  @HiveField(0)
  final String name;
  
  @HiveField(1)
  final int age;

  Person(this.name, this.age);
}
```

### 4.2 生成适配器

你需要运行 `build_runner` 来自动生成适配器文件。这是一个命令行工具，用于生成 Hive 数据模型的代码。

首先，在 `pubspec.yaml` 中添加 `hive_generator` 和 `build_runner`：

```yaml
dev_dependencies:
  hive_generator: ^1.1.1
  build_runner: ^2.1.0
```

然后在项目根目录下运行以下命令：

```bash
flutter pub run build_runner build
```

该命令会根据模型类自动生成一个 `.g.dart` 文件，这个文件包含了 Hive 对象的序列化和反序列化逻辑。

### 4.3 存储和读取自定义对象

一旦生成了适配器，你可以像普通数据一样存储和读取自定义对象。

```dart
// 打开 Box
var box = await Hive.openBox<Person>('peopleBox');

// 存储自定义对象
Person person = Person('John Doe', 30);
box.put('person1', person);

// 读取自定义对象
Person retrievedPerson = box.get('person1');
print(retrievedPerson.name);  // John Doe
print(retrievedPerson.age);   // 30
```

## 5. 关闭 Hive

当应用关闭时，最好关闭所有打开的 Box。你可以使用 `Hive.close()` 来关闭 Hive。

```dart
await Hive.close();
```

## 6. 示例代码

```dart
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  await Hive.initFlutter();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Box box;

  @override
  void initState() {
    super.initState();
    openBox();
  }

  Future<void> openBox() async {
    box = await Hive.openBox('myBox');
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Hive Example')),
      body: Center(
        child: box.isOpen
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Name: ${box.get('name', defaultValue: 'Unknown')}'),
                  Text('Age: ${box.get('age', defaultValue: 0)}'),
                  ElevatedButton(
                    onPressed: () {
                      box.put('name', 'Flutter');
                      box.put('age', 25);
                    },
                    child: Text('Save Data'),
                  ),
                ],
              )
            : CircularProgressIndicator(),
      ),
    );
  }
}
```

## 总结

- Hive 是 Flutter 中非常轻量且高效的本地存储库，适合存储简单的键值对数据。
- 通过使用 `hive_flutter`，你可以轻松地在 Flutter 中集成 Hive。
- Hive 支持存储自定义对象，通过使用 `@HiveType` 和 `@HiveField` 注解来实现。
- 需要运行 `build_runner` 来生成自定义对象的适配器。
- Hive 提供简单的 API 用于存储、读取和删除数据。

通过这些功能，你可以快速实现本地数据存储，并能高效地进行数据存取和管理。

## 参考链接

- [Hive 官方文档](https://docs.hive.io/)
- [Hive GitHub](https://github.com/brianegan/hive)
