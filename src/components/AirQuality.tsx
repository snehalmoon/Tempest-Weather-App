import React from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Wind } from 'lucide-react';

export default function AirQuality() {
  const { weatherData } = useWeatherStore();

  if (!weatherData?.current.air_quality) return null;

  const getAQILabel = (aqi: number) => {
    const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return labels[aqi - 1] || 'Unknown';
  };

  const getAQIColor = (aqi: number) => {
    const colors = [
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-purple-500',
    ];
    return colors[aqi - 1] || 'bg-gray-500';
  };

  return (
    <div className="w-full max-w-md p-6 rounded-xl bg-white/10 backdrop-blur-md mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Air Quality</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-lg">
          {getAQILabel(weatherData.current.air_quality.aqi)}
        </span>
        <div
          className={`px-3 py-1 rounded-full ${getAQIColor(
            weatherData.current.air_quality.aqi
          )}`}
        >
          AQI: {weatherData.current.air_quality.aqi}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm opacity-70">PM2.5</p>
          <p className="font-semibold">
            {weatherData.current.air_quality.components.pm2_5} µg/m³
          </p>
        </div>
        <div>
          <p className="text-sm opacity-70">PM10</p>
          <p className="font-semibold">
            {weatherData.current.air_quality.components.pm10} µg/m³
          </p>
        </div>
      </div>
    </div>
  );
}