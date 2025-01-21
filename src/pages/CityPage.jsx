import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function CityPage() {
    const { id } = useParams();

    // dictionary of coordinates
    const coords = {
        Minsk: { lat: 53.9, lon: 27.56 },
        Vilnus: { lat: 54.68, lon: 25.28 },
        Berlin: { lat: 52.52, lon: 13.41 },
    };

    const { lat, lon } = coords[id] || coords["Minsk"];

    const fetchWeather = async () => {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        return res.json();
    };

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

