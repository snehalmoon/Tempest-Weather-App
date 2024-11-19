import React from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Rocket, AlertTriangle } from 'lucide-react';

export default function SpaceWeather() {
  const { isDarkMode } = useWeatherStore();

  return (
    <div className={`w-full max-w-md p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mt-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Space Weather</h3>
      </div>

      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">Solar Activity</span>
        </div>
        <p className="text-sm opacity-75">
          Moderate solar activity. Minor geomagnetic storms possible in high-latitude regions.
        </p>
      </div>
    </div>
  );
}