import { create } from 'zustand';
import { WeatherData, City } from '../types/weather';

interface WeatherStore {
  weatherData: WeatherData | null;
  selectedCity: City | null;
  isDarkMode: boolean;
  isMetric: boolean;
  setWeatherData: (data: WeatherData) => void;
  setSelectedCity: (city: City) => void;
  toggleDarkMode: () => void;
  toggleUnit: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  selectedCity: null,
  isDarkMode: true,
  isMetric: true,
  setWeatherData: (data) => set({ weatherData: data }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleUnit: () => set((state) => ({ isMetric: !state.isMetric })),
}));