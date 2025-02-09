import { useQueries } from '@tanstack/react-query';
import { fetchWeatherSummary } from '@/services/weatherService';

export function useWeatherSummaries(cities) {
  return useQueries({
    queries: cities.map((city) => ({
      queryKey: ['weatherSummary', city],
      queryFn: () => fetchWeatherSummary(city),
      enabled: Boolean(city),
    })),
  });
}
