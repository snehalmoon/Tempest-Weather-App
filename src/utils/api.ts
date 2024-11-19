const API_KEY = '619d89e309f6b26f9f734eff9868b810';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export async function searchCities(query: string) {
  if (!query) return [];
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch cities');
    const data = await response.json();
    return data.map((city: any) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

export async function getWeatherData(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const currentWeather = await response.json();

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
    const forecastData = await forecastResponse.json();

    return {
      current: {
        temp: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        wind_speed: currentWeather.wind.speed,
        weather: currentWeather.weather,
        uvi: currentWeather.uvi || 0,
        sunrise: currentWeather.sys.sunrise,
        sunset: currentWeather.sys.sunset
      },
      daily: forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((day: any) => ({
          dt: day.dt,
          temp: {
            min: day.main.temp_min,
            max: day.main.temp_max
          },
          weather: day.weather
        }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getAirQuality(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch air quality data');
    return response.json();
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
}