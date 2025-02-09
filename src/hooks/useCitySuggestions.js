import { useQuery } from '@tanstack/react-query';
import { fetchCitySuggestions } from '@/services/weatherService';

export function useCitySuggestions(query) {
  return useQuery({
    queryKey: ['citySuggestions', query],
    queryFn: () => fetchCitySuggestions(query),
    enabled: query?.length > 2,
    staleTime: 1000 * 60 * 5,
  });
}
