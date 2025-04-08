# TypeScript 类型推断

类型推断是 TypeScript 的一个重要特性，它能够根据上下文自动推断出变量的类型。

## 基本类型推断

### 变量类型推断

```typescript
let x = 3; // x 被推断为 number
let y = "hello"; // y 被推断为 string
let z = true; // z 被推断为 boolean
```

### 函数返回值类型推断

```typescript
function add(a: number, b: number) {
    return a + b; // 返回值被推断为 number
}

function concat(a: string, b: string) {
    return a + b; // 返回值被推断为 string
}
```

## 上下文类型推断

### 函数参数类型推断

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button); // OK
    console.log(mouseEvent.kangaroo); // Error
};
```

### 回调函数类型推断

```typescript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        this.info = e.message;
    }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad); // Error
```

## 最佳通用类型推断

### 数组类型推断

```typescript
let x = [0, 1, null]; // x 被推断为 (number | null)[]
let y = [0, 1, null, "a"]; // y 被推断为 (number | string | null)[]
```

### 对象类型推断

```typescript
let zoo = [new Rhino(), new Elephant(), new Snake()];
// zoo 被推断为 (Rhino | Elephant | Snake)[]
```

## 类型推断最佳实践

1. 使用显式类型注解
2. 利用上下文类型推断
3. 使用类型断言
4. 使用类型守卫
5. 使用类型别名

## 下一步

- [类型兼容性](./07-type-compatibility.md)
- [类型编程进阶](./06-advanced-type-programming.md)
- [高级泛型](./05-advanced-generics.md) 