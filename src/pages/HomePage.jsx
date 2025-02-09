import { weatherCodeMap } from '@/utils/weatherCodeMap';
import { useFavorites } from '@/hooks/useFavorites';
import WeatherCard from '@/components/WeatherCard';
import { useWeatherSummaries } from '@/hooks/useWeatherSummaries';

function HomePage() {
  const { favorites } = useFavorites();
  const weatherQueries = useWeatherSummaries(favorites);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">Home page</h1>
      <p className="text-gray-700">Welcome! Here you will find quick cards for favorite cities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherQueries.map((q, i) => {
          const city = favorites[i];
          if (q.isLoading) {
            return <WeatherCard key={city} cityName={city} tempC={null} condition={'Loading...'} />;
          }
          if (q.error) {
            return <WeatherCard key={city} cityName={city} tempC={null} condition={'Error'} />;
          }

          const current = q.data.current;
          return (
            <WeatherCard
              key={city}
              cityName={city}
              tempC={current.temperature_2m}
              condition={weatherCodeMap[current.weathercode] || 'Unknown'}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
