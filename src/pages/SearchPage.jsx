import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function verifyCity(name) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`
    );
    const data = await res.json();
    if (!data.results?.length) {
        throw new Error("City not found");
    }
}

function SearchPage() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;

        try {
            setError(null);
            await verifyCity(trimmed);
            navigate(`/city/${trimmed}`);
        } catch (err) {
            if (err.message === "City not found") {
                setError(`City "${trimmed}" not found`);
            } else {
                setError("Error loading weather");
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">Search city</h1>
            <form onSubmit={onSubmit} className="flex gap-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-96"
                    placeholder="Enter a city"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SearchPage;

