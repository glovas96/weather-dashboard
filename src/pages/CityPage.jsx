import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// function to get coordinates by city name
const fetchCoords = async (city) => {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }
    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
    };
};

// function for getting weather by coordinates
const fetchWeather = async ({ queryKey }) => {
    const [, city] = queryKey;
    const { lat, lon } = await fetchCoords(city);

    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,pressure_msl,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    return res.json();
};

function CityPage() {
    const { id } = useParams(); // id = city ​​name from URL

    const { data, isLoading, error } = useQuery({
        queryKey: ["weather", id],
        queryFn: fetchWeather,
    });

    if (isLoading) return <p>Loading weather...</p>;

    if (error) {
        if (error.message === "City not found") {
            return <p>City "{id}" not found</p>;
        }
        return <p>Error loading weather</p>;
    }

    const current = data.current;
    const daily = data.daily;

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">{id}</h1>

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

