// WeatherCard: reusable card showing city name, temp, and condition

function WeatherCard({ cityName, tempC, condition }) {
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
                // Later: navigate to city page with real id
                onClick={() => alert("Navigate to city details (to be implemented)")}
            >
                View details
            </button>
        </div>
    );
}

export default WeatherCard;
