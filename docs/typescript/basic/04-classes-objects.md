# TypeScript 类和对象

TypeScript 支持基于类的面向对象编程，让我们来了解类和对象的使用。

## 基本类

```typescript
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

## 继承

```typescript
class Animal {
    name: string;
    
    constructor(theName: string) {
        this.name = theName;
    }
    
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
```

## 公共、私有与受保护的修饰符

### 公共成员 (public)

```typescript
class Animal {
    public name: string;
    public constructor(theName: string) {
        this.name = theName;
    }
}
```

### 私有成员 (private)

```typescript
class Animal {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}
```

### 受保护成员 (protected)

```typescript
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
}
```

## 只读修饰符

```typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    
    constructor(theName: string) {
        this.name = theName;
    }
}
```

## 存取器

```typescript
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }
}
```

## 静态属性

```typescript
class Grid {
    static origin = {x: 0, y: 0};
    
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    
    constructor(public scale: number) { }
}
```

## 抽象类

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

## 类实现接口

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

## 构造函数

```typescript
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    
    constructor(message?: string) {
        this.greeting = message;
    }
    
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        } else {
            return Greeter.standardGreeting;
        }
    }
}
```

## 下一步

- [函数](./05-functions.md)
- [泛型](./06-generics.md)
- [模块和命名空间](./08-modules-namespaces.md)
