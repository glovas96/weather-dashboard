import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * SearchPage: minimal search that navigates to city route by name
 * Later: real geocoding + suggestions
 */
function SearchPage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/city/${query.trim()}`);
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
            <p className="text-sm text-gray-600">
                Later: real geocoding + suggestions
            </p>
        </div>
    );
}

export default SearchPage;
