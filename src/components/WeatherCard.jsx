import { useNavigate } from "react-router-dom";

function WeatherCard({ cityName, tempC, condition }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border rounded p-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{cityName}</h3>
                <span className="text-gray-500 text-sm">{condition}</span>
            </div>
            <div className="mt-2 text-3xl font-bold">
                {typeof tempC === "number" ? `${tempC}°C` : "--"}
            </div>
            <button
                className="mt-4 text-blue-600 hover:text-blue-800 underline"
                // navigate to city page with real id
                onClick={() => navigate(`/city/${cityName}`)}
            >
                View details
            </button>
        </div>
    );
}

export default WeatherCard;
