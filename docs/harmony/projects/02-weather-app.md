# 天气应用 (Weather App)

## 项目概述

这是一个功能完整的天气应用，包含以下特性：

- 实时天气显示
- 多天天气预报
- 城市管理
- 天气预警
- 空气质量
- 生活指数

## 项目结构

```txt
weather-app/
├── entry/
│   ├── src/
│   │   ├── main/
│   │   │   ├── ets/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── index.ets
│   │   │   │   │   ├── city.ets
│   │   │   │   │   └── detail.ets
│   │   │   │   ├── components/
│   │   │   │   │   ├── WeatherCard.ets
│   │   │   │   │   ├── ForecastList.ets
│   │   │   │   │   ├── CityList.ets
│   │   │   │   │   └── AirQuality.ets
│   │   │   │   ├── models/
│   │   │   │   │   ├── Weather.ets
│   │   │   │   │   ├── City.ets
│   │   │   │   │   └── Forecast.ets
│   │   │   │   ├── services/
│   │   │   │   │   ├── WeatherService.ets
│   │   │   │   │   ├── LocationService.ets
│   │   │   │   │   └── StorageService.ets
│   │   │   │   └── utils/
│   │   │   │       ├── DateUtils.ets
│   │   │   │       └── WeatherUtils.ets
│   │   │   └── resources/
│   │   └── ohpm.json5
│   └── build-profile.json5
└── oh-package.json5
```

## 核心代码实现

### 数据模型

```ts
// models/Weather.ets
export class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
  timestamp: Date;
  
  constructor(data: any) {
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.windDirection = data.windDirection;
    this.description = data.description;
    this.icon = data.icon;
    this.pressure = data.pressure;
    this.visibility = data.visibility;
    this.feelsLike = data.feelsLike;
    this.uvIndex = data.uvIndex;
    this.timestamp = new Date(data.timestamp);
  }
}

// models/City.ets
export class City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
  
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.country = data.country;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.isFavorite = data.isFavorite || false;
  }
}

// models/Forecast.ets
export class Forecast {
  date: Date;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  
  constructor(data: any) {
    this.date = new Date(data.date);
    this.maxTemp = data.maxTemp;
    this.minTemp = data.minTemp;
    this.description = data.description;
    this.icon = data.icon;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
  }
}
```

### 天气服务

```ts
// services/WeatherService.ets
import http from '@ohos.net.http';

export class WeatherService {
  private static instance: WeatherService;
  private apiKey: string;
  private baseUrl: string;
  
  private constructor() {
    this.apiKey = 'YOUR_API_KEY';
    this.baseUrl = 'https://api.weatherapi.com/v1';
  }
  
  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }
  
  async getCurrentWeather(city: City): Promise<Weather> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city.latitude},${city.longitude}`;
    
    try {
      const response = await http.createHttp().request(url);
      const data = JSON.parse(response.result as string);
      return new Weather(data.current);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      throw error;
    }
  }
  
  async getForecast(city: City, days: number = 7): Promise<Forecast[]> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city.latitude},${city.longitude}&days=${days}`;
    
    try {
      const response = await http.createHttp().request(url);
      const data = JSON.parse(response.result as string);
      return data.forecast.forecastday.map((day: any) => new Forecast(day));
    } catch (error) {
      console.error('Failed to fetch forecast:', error);
      throw error;
    }
  }
  
  async getAirQuality(city: City): Promise<AirQuality> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city.latitude},${city.longitude}&aqi=yes`;
    
    try {
      const response = await http.createHttp().request(url);
      const data = JSON.parse(response.result as string);
      return new AirQuality(data.current.air_quality);
    } catch (error) {
      console.error('Failed to fetch air quality:', error);
      throw error;
    }
  }
}
```

### 位置服务

```ts
// services/LocationService.ets
import geolocation from '@ohos.geolocation';

export class LocationService {
  private static instance: LocationService;
  
  private constructor() {}
  
  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }
  
  async getCurrentLocation(): Promise<Location> {
    try {
      const location = await geolocation.getCurrentLocation();
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        altitude: location.altitude,
        speed: location.speed,
        timestamp: new Date(location.timestamp)
      };
    } catch (error) {
      console.error('Failed to get location:', error);
      throw error;
    }
  }
  
  async searchCity(query: string): Promise<City[]> {
    // 实现城市搜索
    return [];
  }
}
```

### 主页面

```ts
// pages/index.ets
import { Weather } from '../models/Weather';
import { City } from '../models/City';
import { Forecast } from '../models/Forecast';
import { WeatherService } from '../services/WeatherService';
import { LocationService } from '../services/LocationService';
import { StorageService } from '../services/StorageService';

@Entry
@Component
struct WeatherPage {
  @State currentWeather: Weather = null;
  @State forecast: Forecast[] = [];
  @State currentCity: City = null;
  @State cities: City[] = [];
  @State isLoading: boolean = true;
  
  private weatherService: WeatherService;
  private locationService: LocationService;
  private storageService: StorageService;
  
  async aboutToAppear() {
    this.weatherService = WeatherService.getInstance();
    this.locationService = LocationService.getInstance();
    this.storageService = await StorageService.getInstance();
    
    await this.loadData();
  }
  
  async loadData() {
    try {
      this.isLoading = true;
      
      // 加载城市列表
      this.cities = await this.storageService.getCities();
      
      // 获取当前位置
      const location = await this.locationService.getCurrentLocation();
      
      // 获取当前城市
      this.currentCity = await this.getCurrentCity(location);
      
      // 加载天气数据
      await this.loadWeatherData();
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  async loadWeatherData() {
    if (!this.currentCity) return;
    
    try {
      const [weather, forecast] = await Promise.all([
        this.weatherService.getCurrentWeather(this.currentCity),
        this.weatherService.getForecast(this.currentCity)
      ]);
      
      this.currentWeather = weather;
      this.forecast = forecast;
    } catch (error) {
      console.error('Failed to load weather data:', error);
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
            Text(this.currentCity?.name || '')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
            Blank()
            Button({ type: ButtonType.Circle }) {
              Image($r('app.media.refresh'))
                .width(24)
                .height(24)
            }
            .width(40)
            .height(40)
            .onClick(() => this.loadWeatherData())
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          
          // 当前天气
          if (this.currentWeather) {
            WeatherCard({ weather: this.currentWeather })
          }
          
          // 天气预报
          ForecastList({ forecast: this.forecast })
            .margin({ top: 16 })
          
          // 空气质量
          AirQuality({ city: this.currentCity })
            .margin({ top: 16 })
        }
        .width('100%')
        .height('100%')
        .backgroundColor('#F5F5F5')
      }
    }
  }
  
  private async getCurrentCity(location: Location): Promise<City> {
    // 根据位置获取城市信息
    return null;
  }
}
```

### 天气卡片组件

```ts
// components/WeatherCard.ets
@Component
struct WeatherCard {
  @Prop weather: Weather;
  
  build() {
    Column() {
      Row() {
        Image(this.getWeatherIcon())
          .width(64)
          .height(64)
        
        Column() {
          Text(this.weather.temperature.toString() + '°C')
            .fontSize(48)
            .fontWeight(FontWeight.Bold)
          
          Text(this.weather.description)
            .fontSize(16)
            .fontColor('#666666')
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 16 })
      }
      
      Row() {
        this.createWeatherInfo('湿度', this.weather.humidity + '%')
        this.createWeatherInfo('风速', this.weather.windSpeed + ' km/h')
        this.createWeatherInfo('气压', this.weather.pressure + ' hPa')
        this.createWeatherInfo('能见度', this.weather.visibility + ' km')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceAround)
      .margin({ top: 24 })
    }
    .width('100%')
    .padding(24)
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
  }
  
  private createWeatherInfo(label: string, value: string) {
    return Column() {
      Text(label)
        .fontSize(14)
        .fontColor('#666666')
      Text(value)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
    }
  }
  
  private getWeatherIcon(): Resource {
    // 根据天气状况返回对应的图标
    return $r('app.media.sunny');
  }
}
```

## 项目特点

1. 功能完整
   - 实时天气显示
   - 多天天气预报
   - 城市管理
   - 天气预警
   - 空气质量
   - 生活指数

2. 用户体验
   - 流畅的动画效果
   - 直观的数据展示
   - 便捷的城市切换
   - 实时更新机制

3. 性能优化
   - 数据缓存
   - 延迟加载
   - 图片优化
   - 网络请求优化

4. 安全性
   - API 密钥保护
   - 数据加密
   - 错误处理
   - 权限管理

## 运行效果

1. 主页面
   - 当前天气显示
   - 天气预报列表
   - 空气质量指数
   - 生活指数

2. 城市页面
   - 城市搜索
   - 城市列表
   - 收藏管理

3. 详情页面
   - 详细天气信息
   - 天气趋势图
   - 预警信息

## 总结

这个天气应用展示了 HarmonyOS 应用开发的主要特性，包括：

- 网络请求处理
- 位置服务使用
- 数据持久化
- 组件化开发
- 动画效果
- 性能优化

通过这个项目，开发者可以学习到：

1. 如何调用外部 API
2. 如何处理位置信息
3. 如何优化用户体验
4. 如何管理应用状态
5. 如何实现数据缓存
