# UI 开发基础

## 页面布局

### 1. 基本布局

```ts
@Entry
@Component
struct BasicLayout {
  build() {
    Column() {
      Row() {
        Text('Hello')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      
      Row() {
        Text('World')
          .fontSize(30)
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 弹性布局

```ts
@Entry
@Component
struct FlexLayout {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
      Text('Flex Item 1')
        .fontSize(20)
      Text('Flex Item 2')
        .fontSize(20)
      Text('Flex Item 3')
        .fontSize(20)
    }
    .width('100%')
    .height('100%')
  }
}
```

## 基础组件

### 1. 文本组件

```ts
@Entry
@Component
struct TextExample {
  build() {
    Column() {
      Text('普通文本')
        .fontSize(16)
      
      Text('加粗文本')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
      
      Text('彩色文本')
        .fontSize(16)
        .fontColor('#FF0000')
      
      Text('多行文本\n第二行')
        .fontSize(16)
        .textAlign(TextAlign.Center)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 按钮组件

```ts
@Entry
@Component
struct ButtonExample {
  @State count: number = 0
  
  build() {
    Column() {
      Text(`点击次数: ${this.count}`)
        .fontSize(20)
      
      Button('点击我')
        .type(ButtonType.Capsule)
        .backgroundColor('#007DFF')
        .onClick(() => {
          this.count++
        })
      
      Button('禁用按钮')
        .enabled(false)
        .backgroundColor('#CCCCCC')
    }
    .width('100%')
    .height('100%')
  }
}
```

### 3. 图片组件

```ts
@Entry
@Component
struct ImageExample {
  build() {
    Column() {
      Image($r('app.media.icon'))
        .width(100)
        .height(100)
        .borderRadius(50)
      
      Image('https://example.com/image.jpg')
        .width(200)
        .height(200)
        .objectFit(ImageFit.Cover)
      
      Image($r('app.media.icon'))
        .width(100)
        .height(100)
        .blur(10)
    }
    .width('100%')
    .height('100%')
  }
}
```

## 容器组件

### 1. 列表组件

```ts
@Entry
@Component
struct ListExample {
  @State items: Array<string> = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
  
  build() {
    List() {
      ForEach(this.items, (item: string) => {
        ListItem() {
          Text(item)
            .fontSize(16)
            .padding(10)
        }
      })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 网格组件

```ts
@Entry
@Component
struct GridExample {
  @State items: Array<number> = Array(9).fill(0).map((_, i) => i + 1)
  
  build() {
    Grid() {
      ForEach(this.items, (item: number) => {
        GridItem() {
          Text(item.toString())
            .fontSize(20)
            .backgroundColor('#F1F3F5')
            .width('100%')
            .height('100%')
            .textAlign(TextAlign.Center)
        }
      })
    }
    .columnsTemplate('1fr 1fr 1fr')
    .rowsTemplate('1fr 1fr 1fr')
    .width('100%')
    .height('100%')
  }
}
```

### 3. 堆叠组件

```ts
@Entry
@Component
struct StackExample {
  build() {
    Stack() {
      Image($r('app.media.background'))
        .width('100%')
        .height('100%')
      
      Column() {
        Text('标题')
          .fontSize(24)
          .fontColor('#FFFFFF')
        
        Text('副标题')
          .fontSize(16)
          .fontColor('#FFFFFF')
      }
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
  }
}
```

## 样式设置

### 1. 尺寸设置

```ts
@Entry
@Component
struct SizeExample {
  build() {
    Column() {
      Text('固定尺寸')
        .width(100)
        .height(100)
      
      Text('百分比尺寸')
        .width('50%')
        .height('50%')
      
      Text('自适应尺寸')
        .width('auto')
        .height('auto')
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 边距和填充

```ts
@Entry
@Component
struct SpacingExample {
  build() {
    Column() {
      Text('边距示例')
        .margin({ top: 20, right: 20, bottom: 20, left: 20 })
      
      Text('填充示例')
        .padding(20)
      
      Text('边框示例')
        .border({ width: 2, color: '#000000', style: BorderStyle.Solid })
        .borderRadius(10)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 3. 动画效果

```ts
@Entry
@Component
struct AnimationExample {
  @State scale: number = 1
  
  build() {
    Column() {
      Image($r('app.media.icon'))
        .width(100)
        .height(100)
        .scale(this.scale)
        .animation({
          duration: 1000,
          tempo: 1.0,
          delay: 0,
          curve: Curve.EaseInOut,
          iterations: -1,
          playMode: PlayMode.Alternate
        })
      
      Button('开始动画')
        .onClick(() => {
          this.scale = 1.5
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

## 事件处理

### 1. 点击事件

```ts
@Entry
@Component
struct ClickExample {
  @State count: number = 0
  
  build() {
    Column() {
      Text(`点击次数: ${this.count}`)
        .fontSize(20)
      
      Button('点击我')
        .onClick(() => {
          this.count++
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 2. 手势事件

```ts
@Entry
@Component
struct GestureExample {
  @State scale: number = 1
  
  build() {
    Column() {
      Image($r('app.media.icon'))
        .width(100)
        .height(100)
        .scale(this.scale)
        .gesture(
          PinchGesture()
            .onAction(() => {
              this.scale = this.scale * 1.2
            })
        )
    }
    .width('100%')
    .height('100%')
  }
}
```
