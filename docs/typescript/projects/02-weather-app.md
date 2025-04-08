# TypeScript 天气查询应用

本教程将带领你使用 TypeScript 构建一个天气查询应用。我们将使用 React 作为前端框架，并集成天气 API 来获取实时天气数据。

## 项目结构

```
weather-app/
├── src/
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── WeatherForecast.tsx
│   ├── types/
│   │   └── weather.ts
│   ├── services/
│   │   └── weatherApi.ts
│   ├── hooks/
│   │   └── useWeather.ts
│   └── App.tsx
├── public/
├── package.json
└── tsconfig.json
```

## 类型定义

首先，让我们定义天气相关的类型：

```typescript
// src/types/weather.ts
export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
  };
}

export interface ForecastData {
  forecastday: {
    date: string;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }[];
}

export interface WeatherError {
  message: string;
  code: number;
}
```

## API 服务

```typescript
// src/services/weatherApi.ts
import { WeatherData, ForecastData, WeatherError } from '../types/weather';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.weatherapi.com/v1';

export class WeatherApi {
  static async getCurrentWeather(location: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
    );
    
    if (!response.ok) {
      const error: WeatherError = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  static async getForecast(location: string, days: number = 3): Promise<ForecastData> {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}`
    );
    
    if (!response.ok) {
      const error: WeatherError = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }
}
```

## 自定义 Hook

```typescript
// src/hooks/useWeather.ts
import { useState, useEffect } from 'react';
import { WeatherData, ForecastData, WeatherError } from '../types/weather';
import { WeatherApi } from '../services/weatherApi';

export const useWeather = (initialLocation: string = 'London') => {
  const [location, setLocation] = useState(initialLocation);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [currentWeather, forecastData] = await Promise.all([
          WeatherApi.getCurrentWeather(location),
          WeatherApi.getForecast(location)
        ]);
        
        setWeather(currentWeather);
        setForecast(forecastData);
      } catch (err) {
        setError(err as WeatherError);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return {
    location,
    setLocation,
    weather,
    forecast,
    loading,
    error
  };
};
```

## 组件实现

### WeatherCard 组件

```typescript
// src/components/WeatherCard.tsx
import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="location">
        <h2>{weather.location.name}</h2>
        <p>{weather.location.country}</p>
        <p>{weather.location.localtime}</p>
      </div>
      <div className="current-weather">
        <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
        <div className="temperature">
          <h1>{weather.current.temp_c}°C</h1>
          <p>Feels like: {weather.current.feelslike_c}°C</p>
        </div>
        <div className="details">
          <p>Condition: {weather.current.condition.text}</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p>Humidity: {weather.current.humidity}%</p>
        </div>
      </div>
    </div>
  );
};
```

### SearchBar 组件

```typescript
// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button type="submit">Search</button>
    </form>
  );
};
```

### WeatherForecast 组件

```typescript
// src/components/WeatherForecast.tsx
import React from 'react';
import { ForecastData } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastData;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="weather-forecast">
      <h3>3-Day Forecast</h3>
      <div className="forecast-days">
        {forecast.forecastday.map(day => (
          <div key={day.date} className="forecast-day">
            <p>{new Date(day.date).toLocaleDateString()}</p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <div className="temperatures">
              <span className="max">{day.day.maxtemp_c}°C</span>
              <span className="min">{day.day.mintemp_c}°C</span>
            </div>
            <p>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 主应用组件

```typescript
// src/App.tsx
import React from 'react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { WeatherForecast } from './components/WeatherForecast';
import { useWeather } from './hooks/useWeather';
import './App.css';

export const App: React.FC = () => {
  const {
    location,
    setLocation,
    weather,
    forecast,
    loading,
    error
  } = useWeather();

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={setLocation} />
      
      {loading && <div className="loading">Loading...</div>}
      
      {error && (
        <div className="error">
          Error: {error.message}
        </div>
      )}
      
      {weather && <WeatherCard weather={weather} />}
      
      {forecast && <WeatherForecast forecast={forecast} />}
    </div>
  );
};
```

## 样式文件

```css
/* src/App.css */
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.weather-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.location h2 {
  margin: 0;
  color: #333;
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.temperature h1 {
  margin: 0;
  font-size: 3em;
  color: #333;
}

.weather-forecast {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.forecast-days {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.forecast-day {
  text-align: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.temperatures {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.max {
  color: #ff6b6b;
}

.min {
  color: #4dabf7;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
  padding: 10px;
  background: #f8d7da;
  border-radius: 4px;
  margin: 10px 0;
}
```

## 项目配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 运行项目

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

## 功能特点

1. 实时天气查询
2. 3天天气预报
3. 温度单位切换（摄氏/华氏）
4. 错误处理和加载状态
5. 响应式设计

## 下一步

- [聊天应用](./03-chat-app.md)
- [电商网站](./04-ecommerce.md)
- [博客系统](./05-blog-system.md) 