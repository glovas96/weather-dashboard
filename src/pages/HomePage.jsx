import WeatherCard from "../components/WeatherCard";

function HomePage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">Home page</h1>
            <p className="text-gray-700">
                Welcome! Here you will find quick cards for favorite cities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WeatherCard cityName="Minsk" tempC={-3} condition="Cloudy" />
                <WeatherCard cityName="Vilnus" tempC={-1} condition="Snow" />
                <WeatherCard cityName="Berlin" tempC={2} condition="Sunny" />
            </div>
        </div>
    );
}

export default HomePage;