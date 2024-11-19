import React, { useEffect } from 'react';
import { Sun, Moon, Thermometer, CloudLightning } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useWeatherStore } from './store/weatherStore';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import AirQuality from './components/AirQuality';
import ActivitySuggestions from './components/ActivitySuggestions';
import SpaceWeather from './components/SpaceWeather';
import CrowdReport from './components/CrowdReport';
import { getWeatherData, getAirQuality } from './utils/api';

function App() {
  const {
    selectedCity,
    isDarkMode,
    isMetric,
    toggleDarkMode,
    toggleUnit,
    setWeatherData,
    weatherData,
  } = useWeatherStore();

  useEffect(() => {
    if (selectedCity) {
      const fetchData = async () => {
        try {
          const [weather, air] = await Promise.all([
            getWeatherData(selectedCity.lat, selectedCity.lon),
            getAirQuality(selectedCity.lat, selectedCity.lon),
          ]);
          setWeatherData({
            ...weather,
            current: {
              ...weather.current,
              air_quality: air.list[0],
            },
          });
        } catch (error) {
          toast.error('Failed to fetch weather data');
        }
      };
      fetchData();
    }
  }, [selectedCity, setWeatherData]);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <CloudLightning className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Tempest</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Weather Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } hover:bg-opacity-80 shadow-lg`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={toggleUnit}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } hover:bg-opacity-80 shadow-lg`}
              aria-label="Toggle temperature unit"
            >
              <Thermometer className="h-6 w-6" />
            </button>
          </div>
        </header>

        <main className="flex flex-col items-center gap-6">
          <SearchBar />
          {weatherData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                <div className="space-y-6">
                  <WeatherCard />
                  <ActivitySuggestions />
                  <SpaceWeather />
                </div>
                <div className="space-y-6">
                  <Forecast />
                  <AirQuality />
                  <CrowdReport />
                </div>
              </div>
              {weatherData.alerts && (
                <div className="w-full max-w-4xl p-4 bg-red-500/10 backdrop-blur-md rounded-lg mt-4">
                  <h3 className="text-xl font-semibold mb-2">Weather Alerts</h3>
                  {weatherData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="p-3 bg-red-500/20 rounded-lg mb-2"
                    >
                      <p className="font-semibold">{alert.event}</p>
                      <p className="text-sm mt-1">{alert.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;