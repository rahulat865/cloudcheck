const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const statusMessage = document.querySelector("#status-message");
const weatherResult = document.querySelector("#weather-result");

form.addEventListener("submit", handleSearch);

async function handleSearch(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        statusMessage.textContent = "Please enter a city.";
        weatherResult.replaceChildren();
        return;
    }

    statusMessage.textContent = "Searching for weather...";
    weatherResult.replaceChildren();

    try {
        const location = await findCity(city);
        const weather = await getWeather(location.latitude, location.longitude);

        displayWeather(location, weather);
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = error.message;
        weatherResult.replaceChildren();
        console.error(error);
    }
}

async function findCity(city) {
    const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=1&language=en&format=json";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for that city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Try another city.");
    }

    return data.results[0];
}

async function getWeather(latitude, longitude) {
    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to load the weather.");
    }

    const data = await response.json();

    if (!data.current) {
        throw new Error("Weather data is unavailable.");
    }

    return data;
}

function displayWeather(location, weatherData) {
    const current = weatherData.current;
    const units = weatherData.current_units;

    const title = document.createElement("h2");
    title.textContent = `${location.name}, ${location.country}`;

    const temperature = document.createElement("p");
    temperature.textContent =
        `Temperature: ${current.temperature_2m}${units.temperature_2m}`;

    const conditions = document.createElement("p");
    conditions.textContent =
        `Conditions: ${getWeatherDescription(current.weather_code)}`;

    const humidity = document.createElement("p");
    humidity.textContent =
        `Humidity: ${current.relative_humidity_2m}${units.relative_humidity_2m}`;

    const wind = document.createElement("p");
    wind.textContent =
        `Wind speed: ${current.wind_speed_10m}${units.wind_speed_10m}`;

    weatherResult.replaceChildren(title, temperature, conditions, humidity, wind);
}

function getWeatherDescription(code) {
    if (code === 0) {
        return "Clear sky";
    }

    if (code >= 1 && code <= 3) {
        return "Partly cloudy";
    }

    if (code >= 45 && code <= 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown conditions";
}
