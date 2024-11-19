export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    uvi: number;
    sunrise: number;
    sunset: number;
    air_quality?: {
      aqi: number;
      components: {
        co: number;
        no2: number;
        o3: number;
        pm2_5: number;
        pm10: number;
      };
    };
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  alerts?: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}