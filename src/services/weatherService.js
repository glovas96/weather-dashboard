const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

const safeFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const fetchCoords = async (city) => {
  const data = await safeFetch(`${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1`);
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }
  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
  };
};

export const fetchWeather = async (city) => {
  const { lat, lon } = await fetchCoords(city);
  return safeFetch(
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,pressure_msl,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );
};

export const fetchWeatherSummary = async (city) => {
  const { lat, lon } = await fetchCoords(city);
  return safeFetch(
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`
  );
};

export const fetchCitySuggestions = async (name) => {
  const data = await safeFetch(`${GEOCODING_URL}?name=${encodeURIComponent(name)}&count=5`);
  return data.results || [];
};

export const verifyCity = async (name) => {
  const data = await safeFetch(`${GEOCODING_URL}?name=${encodeURIComponent(name)}&count=1`);
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }
};
