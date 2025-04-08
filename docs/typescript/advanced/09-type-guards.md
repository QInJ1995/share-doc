# TypeScript 类型守卫

类型守卫是 TypeScript 中的一个重要特性，它允许我们在运行时检查变量的类型。

## typeof 类型守卫

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## instanceof 类型守卫

```typescript
class Bird {
    fly() {
        console.log("bird fly");
    }
    layEggs() {
        console.log("bird lay eggs");
    }
}

class Fish {
    swim() {
        console.log("fish swim");
    }
    layEggs() {
        console.log("fish lay eggs");
    }
}

function getRandomPet(): Fish | Bird {
    return Math.random() > 0.5 ? new Fish() : new Bird();
}

let pet = getRandomPet();

if (pet instanceof Fish) {
    pet.swim();
} else {
    pet.fly();
}
```

## 自定义类型守卫

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}
```

## 类型谓词

```typescript
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## 类型守卫最佳实践

1. 使用 typeof 进行基本类型检查
2. 使用 instanceof 进行类类型检查
3. 使用自定义类型守卫进行复杂类型检查
4. 使用类型谓词进行类型断言
5. 避免使用 any 类型

## 下一步

- [类型推断](./08-type-inference.md)
- [类型兼容性](./07-type-compatibility.md)
- [类型编程进阶](./06-advanced-type-programming.md) 