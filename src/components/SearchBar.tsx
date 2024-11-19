import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { searchCities } from '../utils/api';
import { useWeatherStore } from '../store/weatherStore';
import type { City } from '../types/weather';
import { toast } from 'react-hot-toast';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);
  const isDarkMode = useWeatherStore((state) => state.isDarkMode);

  const fetchSuggestions = useCallback(async () => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const cities = await searchCities(query);
      setSuggestions(cities);
    } catch (error) {
      toast.error('Failed to fetch city suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchSuggestions]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className={`w-full px-4 py-2 pl-10 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-white placeholder-gray-400'
              : 'bg-white text-gray-900 placeholder-gray-500'
          } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <Search
          className={`absolute left-3 top-2.5 h-5 w-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
      </div>
      {isLoading && (
        <div className={`absolute z-10 w-full mt-1 p-2 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border border-gray-300 text-center`}>
          Loading...
        </div>
      )}
      {!isLoading && suggestions.length > 0 && (
        <ul
          className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border border-gray-300`}
        >
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${city.lat}-${city.lon}`}
              onClick={() => {
                setSelectedCity(city);
                setQuery('');
                setSuggestions([]);
              }}
              className={`px-4 py-2 cursor-pointer ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-white'
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}