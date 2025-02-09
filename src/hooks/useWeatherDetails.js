import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '@/services/weatherService';

export function useWeatherDetails(city) {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: Boolean(city),
  });
}
