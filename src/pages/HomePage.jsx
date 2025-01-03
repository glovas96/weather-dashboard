import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">Home page</h1>
            <nav className="flex gap-6 text-lg">
                <Link
                    to="/city/123"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    City page
                </Link>
                <Link
                    to="/search"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    Search page
                </Link>
            </nav>
        </div>
    );
}

export default HomePage;