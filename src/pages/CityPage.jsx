import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// function to get coordinates by city name
const fetchCoords = async (city) => {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
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
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
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
    if (error) return <p>Error loading weather</p>;

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">City: {id}</h1>
            <p className="text-gray-700">
                Current temperature: {data.current.temperature_2m}°C
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.daily.time.map((day, i) => (
                    <div key={day} className="bg-white border rounded p-4">
                        <p>{day}</p>
                        <p>
                            {data.daily.temperature_2m_min[i]}°C —{" "}
                            {data.daily.temperature_2m_max[i]}°C
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CityPage;
