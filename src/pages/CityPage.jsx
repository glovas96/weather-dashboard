import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";
import { fetchWeather } from "../utils/weather";

function CityPage() {
    const { id } = useParams(); // id = city name from URL

    const { data, isLoading, error } = useQuery({
        queryKey: ["weather", id],
        queryFn: () => fetchWeather(id),
    });

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(isFavorite(id));
    }, [id]);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(id);
            setFavorite(false);
        } else {
            addFavorite(id);
            setFavorite(true);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        if (error.message === "City not found") {
            return (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 w-full md:w-96">
                    City "{id}" not found
                </p>
            );
        }
        return (
            <p className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 w-full md:w-96">
                Error loading weather
            </p>
        );
    }

    const current = data.current;
    const daily = data.daily;

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{id}</h1>
                <button onClick={toggleFavorite} className="text-2xl">
                    {favorite ? "⭐" : "☆"}
                </button>
            </div>

            {/* Current weather */}
            <h2 className="text-xl font-bold">Current Weather</h2>
            <div className="bg-white border rounded shadow p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <h2 className="font-semibold">Temperature</h2>
                    <p>{current.temperature_2m}°C</p>
                </div>
                <div>
                    <h2 className="font-semibold">Feels Like</h2>
                    <p>{current.apparent_temperature}°C</p>
                </div>
                <div>
                    <h2 className="font-semibold">Precipitation</h2>
                    <p>{current.precipitation} mm</p>
                </div>
                <div>
                    <h2 className="font-semibold">Humidity</h2>
                    <p>{current.relative_humidity_2m}%</p>
                </div>
                <div>
                    <h2 className="font-semibold">Pressure</h2>
                    <p>{current.pressure_msl} hPa</p>
                </div>
                <div>
                    <h2 className="font-semibold">Wind</h2>
                    <p>{current.wind_speed_10m} m/s</p>
                </div>
            </div>

            {/* Weekly forecast */}
            <h2 className="text-xl font-bold">Weekly forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {daily.time.map((day, i) => (
                    <div key={day} className="bg-white border rounded p-4">
                        <p className="font-semibold">{day}</p>
                        <p>
                            {daily.temperature_2m_min[i]}°C — {daily.temperature_2m_max[i]}°C
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CityPage;
