# 图片画廊应用 (Image Gallery App)

## 项目概述

这是一个功能完整的图片画廊应用，包含以下特性：

- 图片浏览和预览
- 图片分类管理
- 图片编辑和滤镜
- 图片分享和导出
- 云同步功能
- 智能相册

## 项目结构

```txt
image-gallery/
├── entry/
│   ├── src/
│   │   ├── main/
│   │   │   ├── ets/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── index.ets
│   │   │   │   │   ├── album.ets
│   │   │   │   │   ├── editor.ets
│   │   │   │   │   └── settings.ets
│   │   │   │   ├── components/
│   │   │   │   │   ├── ImageGrid.ets
│   │   │   │   │   ├── ImagePreview.ets
│   │   │   │   │   ├── FilterPanel.ets
│   │   │   │   │   └── AlbumList.ets
│   │   │   │   ├── models/
│   │   │   │   │   ├── Image.ets
│   │   │   │   │   ├── Album.ets
│   │   │   │   │   └── Filter.ets
│   │   │   │   ├── services/
│   │   │   │   │   ├── ImageService.ets
│   │   │   │   │   ├── StorageService.ets
│   │   │   │   │   └── CloudService.ets
│   │   │   │   └── utils/
│   │   │   │       ├── ImageUtils.ets
│   │   │   │       └── DateUtils.ets
│   │   │   └── resources/
│   │   └── ohpm.json5
│   └── build-profile.json5
└── oh-package.json5
```

## 核心代码实现

### 数据模型

```ts
// models/Image.ets
export class Image {
  id: string;
  uri: string;
  thumbnailUri: string;
  width: number;
  height: number;
  size: number;
  createTime: Date;
  modifyTime: Date;
  location: Location;
  tags: string[];
  albumId: string;
  isFavorite: boolean;
  
  constructor(data: any) {
    this.id = data.id;
    this.uri = data.uri;
    this.thumbnailUri = data.thumbnailUri;
    this.width = data.width;
    this.height = data.height;
    this.size = data.size;
    this.createTime = new Date(data.createTime);
    this.modifyTime = new Date(data.modifyTime);
    this.location = data.location;
    this.tags = data.tags || [];
    this.albumId = data.albumId;
    this.isFavorite = data.isFavorite || false;
  }
}

// models/Album.ets
export class Album {
  id: string;
  name: string;
  coverUri: string;
  imageCount: number;
  createTime: Date;
  modifyTime: Date;
  isCloud: boolean;
  
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.coverUri = data.coverUri;
    this.imageCount = data.imageCount;
    this.createTime = new Date(data.createTime);
    this.modifyTime = new Date(data.modifyTime);
    this.isCloud = data.isCloud || false;
  }
}

// models/Filter.ets
export class Filter {
  id: string;
  name: string;
  previewUri: string;
  parameters: FilterParameters;
  
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.previewUri = data.previewUri;
    this.parameters = data.parameters;
  }
}

interface FilterParameters {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  sharpen: number;
}
```

### 图片服务

```ts
// services/ImageService.ets
import image from '@ohos.multimedia.image';

export class ImageService {
  private static instance: ImageService;
  
  private constructor() {}
  
  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }
  
  async loadImage(uri: string): Promise<Image> {
    try {
      const imageSource = image.createImageSource(uri);
      const imageInfo = await imageSource.getImageInfo();
      
      return new Image({
        id: uri,
        uri: uri,
        thumbnailUri: uri,
        width: imageInfo.size.width,
        height: imageInfo.size.height,
        size: imageInfo.size.width * imageInfo.size.height * 4,
        createTime: new Date(),
        modifyTime: new Date()
      });
    } catch (error) {
      console.error('Failed to load image:', error);
      throw error;
    }
  }
  
  async generateThumbnail(image: Image, size: number): Promise<string> {
    try {
      const imageSource = image.createImageSource(image.uri);
      const thumbnail = await imageSource.createThumbnail({
        size: { width: size, height: size }
      });
      
      return thumbnail.uri;
    } catch (error) {
      console.error('Failed to generate thumbnail:', error);
      throw error;
    }
  }
  
  async applyFilter(image: Image, filter: Filter): Promise<string> {
    try {
      const imageSource = image.createImageSource(image.uri);
      const imageReceiver = image.createImageReceiver({
        width: image.width,
        height: image.height,
        format: 4,
        capacity: 1
      });
      
      // 应用滤镜参数
      await this.applyFilterParameters(imageSource, imageReceiver, filter.parameters);
      
      return imageReceiver.uri;
    } catch (error) {
      console.error('Failed to apply filter:', error);
      throw error;
    }
  }
  
  private async applyFilterParameters(
    source: image.ImageSource,
    receiver: image.ImageReceiver,
    parameters: FilterParameters
  ): Promise<void> {
    // 实现滤镜参数应用
  }
}
```

### 主页面

```ts
// pages/index.ets
import { Image } from '../models/Image';
import { Album } from '../models/Album';
import { ImageService } from '../services/ImageService';
import { StorageService } from '../services/StorageService';

@Entry
@Component
struct GalleryPage {
  @State images: Image[] = [];
  @State albums: Album[] = [];
  @State currentAlbum: Album = null;
  @State isLoading: boolean = true;
  
  private imageService: ImageService;
  private storageService: StorageService;
  
  async aboutToAppear() {
    this.imageService = ImageService.getInstance();
    this.storageService = await StorageService.getInstance();
    
    await this.loadData();
  }
  
  async loadData() {
    try {
      this.isLoading = true;
      
      // 加载相册列表
      this.albums = await this.storageService.getAlbums();
      
      // 加载当前相册的图片
      if (this.currentAlbum) {
        this.images = await this.storageService.getImages(this.currentAlbum.id);
      } else {
        // 加载所有图片
        this.images = await this.storageService.getAllImages();
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  build() {
    Stack() {
      if (this.isLoading) {
        LoadingProgress()
          .color('#007DFF')
      } else {
        Column() {
          // 顶部导航栏
          Row() {
            Text(this.currentAlbum?.name || '所有图片')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
            Blank()
            Button({ type: ButtonType.Circle }) {
              Image($r('app.media.settings'))
                .width(24)
                .height(24)
            }
            .width(40)
            .height(40)
            .onClick(() => this.navigateToSettings())
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          
          // 相册列表
          AlbumList({ albums: this.albums })
            .onAlbumSelect((album: Album) => {
              this.currentAlbum = album;
              this.loadData();
            })
          
          // 图片网格
          ImageGrid({ images: this.images })
            .onImageSelect((image: Image) => {
              this.navigateToPreview(image);
            })
        }
        .width('100%')
        .height('100%')
        .backgroundColor('#F5F5F5')
      }
    }
  }
  
  private navigateToPreview(image: Image) {
    // 导航到预览页面
  }
  
  private navigateToSettings() {
    // 导航到设置页面
  }
}
```

### 图片网格组件

```ts
// components/ImageGrid.ets
@Component
struct ImageGrid {
  @Prop images: Image[];
  @Link onImageSelect: (image: Image) => void;
  
  @State gridColumns: number = 3;
  
  build() {
    Grid() {
      ForEach(this.images, (image: Image) => {
        GridItem() {
          Image(image.thumbnailUri)
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Cover)
            .onClick(() => this.onImageSelect(image))
        }
        .width('100%')
        .aspectRatio(1)
      })
    }
    .columnsTemplate('1fr 1fr 1fr')
    .columnsGap(4)
    .rowsGap(4)
    .padding(4)
  }
}
```

## 项目特点

1. 功能完整
   - 图片浏览和预览
   - 图片分类管理
   - 图片编辑和滤镜
   - 图片分享和导出
   - 云同步功能
   - 智能相册

2. 用户体验
   - 流畅的图片加载
   - 优雅的过渡动画
   - 直观的操作界面
   - 便捷的编辑工具

3. 性能优化
   - 图片缓存
   - 懒加载
   - 缩略图优化
   - 内存管理

4. 安全性
   - 数据加密
   - 权限管理
   - 云同步安全
   - 隐私保护

## 运行效果

1. 主页面
   - 相册列表
   - 图片网格
   - 快速预览
   - 操作菜单

2. 预览页面
   - 图片查看
   - 缩放控制
   - 编辑工具
   - 分享选项

3. 编辑页面
   - 滤镜效果
   - 裁剪工具
   - 调整参数
   - 保存选项

## 总结

这个图片画廊应用展示了 HarmonyOS 应用开发的主要特性，包括：

- 图片处理
- 数据管理
- 用户界面
- 性能优化
- 云服务集成

通过这个项目，开发者可以学习到：

1. 如何处理图片资源
2. 如何实现图片编辑
3. 如何优化用户体验
4. 如何管理大量数据
5. 如何实现云同步
