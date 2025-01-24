import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto p-4 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl">WeatherDash</Link>
                <nav className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? "text-blue-700 font-semibold" : "text-blue-600"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? "text-blue-700 font-semibold" : "text-blue-600"}`
                        }
                    >
                        Search
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
