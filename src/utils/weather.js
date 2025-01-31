// function to get coordinates by city name
export const fetchCoords = async (city) => {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }
    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
    };
};

// full query for CityPage
export const fetchWeather = async (city) => {
    const { lat, lon } = await fetchCoords(city);
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,pressure_msl,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    return res.json();
};

// simple query for HomePage
export const fetchWeatherSummary = async (city) => {
    const { lat, lon } = await fetchCoords(city);
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`
    );
    return res.json();
};
