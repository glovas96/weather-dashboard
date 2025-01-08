import { useParams } from "react-router-dom";

/**
 * CityPage: shows weather for specific city id (name for now)
 * Later: fetch by geocoded coordinates
 */
function CityPage() {
    const { id } = useParams();

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">City: {id}</h1>
            <p className="text-gray-700">
                Here you will see the current weather, a 7‑day forecast, and charts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placeholder blocks */}
                <div className="bg-white border rounded p-4">Current weather</div>
                <div className="bg-white border rounded p-4">Weekly forecast</div>
            </div>
        </div>
    );
}

export default CityPage;
