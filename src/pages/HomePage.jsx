import WeatherCard from "../components/WeatherCard";
import { getFavorites } from "../utils/favorites";
import { useState, useEffect } from "react";

function HomePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">Home page</h1>
      <p className="text-gray-700">
        Welcome! Here you will find quick cards for favorite cities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((city) => (
          <WeatherCard
            key={city}
            cityName={city}
            tempC={"--"}
            condition={"--"}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

