import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCitySuggestions, verifyCity } from "../utils/weather";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // handle input and suggestions
    const onChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setError(null);

        if (value.length > 2) {
            try {
                const results = await fetchCitySuggestions(value);
                setSuggestions(results);
            } catch {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    // submit with city validation
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
            <form onSubmit={onSubmit} className="flex gap-3 relative">
                <input
                    type="text"
                    value={query}
                    onChange={onChange}
                    className="border rounded px-3 py-2 w-full md:w-96"
                    placeholder="Enter a city"
                />

                {/* suggestions list */}
                {suggestions.length > 0 && (
                    <ul className="absolute top-full w-full border rounded bg-white mt-1">
                        {suggestions.map((s) => (
                            <li
                                key={s.id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setQuery(`${s.name}, ${s.country}`);
                                    setSuggestions([]);
                                }}
                            >
                                {s.name}, {s.country}
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:scale-95"
                >
                    Search
                </button>
            </form>

            {/* error output */}
            {error && (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 w-full md:w-96">
                    {error}
                </p>
            )}
        </div>
    );
}

export default SearchPage;


