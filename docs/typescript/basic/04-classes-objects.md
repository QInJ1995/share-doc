# 第四章：类和对象

## 类的基本概念

TypeScript 中的类是基于 ES6 类的语法，并添加了类型注解和其他特性。

### 1. 基本类定义

```typescript
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

const person = new Person("Alice", 30);
console.log(person.greet());
```

### 2. 访问修饰符

TypeScript 提供了三种访问修饰符：

- `public`：默认修饰符，可以在任何地方访问
- `private`：只能在类内部访问
- `protected`：可以在类内部和子类中访问

```typescript
class Animal {
    public name: string;
    private age: number;
    protected species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
}

class Dog extends Animal {
    constructor(name: string, age: number) {
        super(name, age, "dog");
        console.log(this.species); // OK
        // console.log(this.age); // Error: age is private
    }
}
```

### 3. 只读属性

使用 `readonly` 关键字可以创建只读属性：

```typescript
class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const point = new Point(1, 2);
// point.x = 3; // Error: x is readonly
```

### 4. 静态属性

使用 `static` 关键字可以定义静态属性和方法：

```typescript
class MathHelper {
    static PI: number = 3.14159;

    static calculateCircleArea(radius: number): number {
        return this.PI * radius * radius;
    }
}

console.log(MathHelper.PI);
console.log(MathHelper.calculateCircleArea(5));
```

### 5. 抽象类

抽象类作为其他类的基类使用，不能被直接实例化：

```typescript
abstract class Animal {
    abstract makeSound(): void;
    
    move(): void {
        console.log("roaming the earth...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

// const animal = new Animal(); // Error: Cannot create an instance of an abstract class
const dog = new Dog();
dog.makeSound();
dog.move();
```

### 6. 接口实现

类可以实现接口：

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    
    setTime(d: Date) {
        this.currentTime = d;
    }
}
```

### 7. 继承

类可以继承其他类：

```typescript
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    move(distance: number = 5) {
        console.log("Slithering...");
        super.move(distance);
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    move(distance: number = 45) {
        console.log("Galloping...");
        super.move(distance);
    }
}
```

### 8. 存取器（Getters/Setters）

```typescript
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > 3) {
            this._fullName = newName;
        } else {
            console.log("Error: fullName must be longer than 3 characters");
        }
    }
}

const employee = new Employee();
employee.fullName = "Bob Smith";
console.log(employee.fullName);
```

### 9. 类作为接口

类定义会创建两个东西：类的实例类型和一个构造函数：

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

### 本章小结

- 学习了类的基本定义和用法
- 了解了访问修饰符（public、private、protected）
- 掌握了只读属性和静态属性
- 理解了抽象类和接口实现
- 学习了类的继承和存取器
- 了解了类作为接口的用法

在下一章中，我们将学习 TypeScript 的函数。
