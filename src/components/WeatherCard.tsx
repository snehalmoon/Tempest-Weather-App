import React from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Sun, Moon, Droplets, Wind } from 'lucide-react';

export default function WeatherCard() {
  const { weatherData, selectedCity, isMetric } = useWeatherStore();

  if (!weatherData || !selectedCity) return null;

  const temp = isMetric
    ? weatherData.current.temp
    : weatherData.current.temp * 1.8 + 32;

  return (
    <div className="w-full max-w-md p-6 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{selectedCity.name}</h2>
          <p className="text-lg opacity-90">{selectedCity.country}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">
            {Math.round(temp)}°{isMetric ? 'C' : 'F'}
          </p>
          <p className="text-lg">
            {weatherData.current.weather[0].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5" />
          <span>{weatherData.current.humidity}% Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          <span>{weatherData.current.wind_speed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          <span>
            {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Moon className="h-5 w-5" />
          <span>
            {new Date(weatherData.current.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}