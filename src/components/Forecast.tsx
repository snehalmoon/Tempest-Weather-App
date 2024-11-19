import React from 'react';
import { useWeatherStore } from '../store/weatherStore';

export default function Forecast() {
  const { weatherData, isMetric } = useWeatherStore();

  if (!weatherData) return null;

  return (
    <div className="w-full max-w-4xl mt-6">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {weatherData.daily.slice(0, 5).map((day) => {
          const temp = isMetric
            ? day.temp.max
            : day.temp.max * 1.8 + 32;

          return (
            <div
              key={day.dt}
              className="p-4 rounded-lg bg-white/10 backdrop-blur-md"
            >
              <p className="text-center">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-16 h-16 mx-auto"
              />
              <p className="text-center font-bold">
                {Math.round(temp)}°{isMetric ? 'C' : 'F'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}