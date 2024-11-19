import React from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Bike, Umbrella, Sun, Cloud, CloudRain, Wind } from 'lucide-react';

export default function ActivitySuggestions() {
  const { weatherData, isDarkMode } = useWeatherStore();

  if (!weatherData) return null;

  const getActivities = () => {
    const temp = weatherData.current.temp;
    const weather = weatherData.current.weather[0].main.toLowerCase();
    const wind = weatherData.current.wind_speed;

    const activities = [];

    if (temp > 20 && !weather.includes('rain')) {
      activities.push({
        name: 'Perfect for Cycling',
        icon: <Bike className="w-5 h-5" />,
        description: 'Great weather for a bike ride!'
      });
    }

    if (temp > 25 && weather.includes('clear')) {
      activities.push({
        name: 'Beach Day',
        icon: <Sun className="w-5 h-5" />,
        description: 'Ideal conditions for beach activities'
      });
    }

    if (weather.includes('rain')) {
      activities.push({
        name: 'Indoor Activities',
        icon: <Umbrella className="w-5 h-5" />,
        description: 'Visit museums or enjoy indoor sports'
      });
    }

    if (wind < 5 && !weather.includes('rain')) {
      activities.push({
        name: 'Outdoor Sports',
        icon: <Cloud className="w-5 h-5" />,
        description: 'Perfect conditions for outdoor games'
      });
    }

    return activities;
  };

  const activities = getActivities();

  return (
    <div className={`w-full max-w-md p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mt-6`}>
      <h3 className="text-xl font-semibold mb-4">Recommended Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              {activity.icon}
              <div>
                <h4 className="font-medium">{activity.name}</h4>
                <p className="text-sm opacity-75">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}