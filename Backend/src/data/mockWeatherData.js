import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load cityData.json
const cityDataPath = path.join(__dirname, "cityData.json");
const cityData = JSON.parse(fs.readFileSync(cityDataPath, "utf8"));

// Load weatherData.json
const weatherDataPath = path.join(__dirname, "weatherData.json");
const weatherData = JSON.parse(fs.readFileSync(weatherDataPath, "utf8"));

const rand = (min, max) => Math.random() * (max - min) + min;

export const formatString = (str) =>
    str
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z]/g, ""); // convert string to lower case and removes everything that is NOT a–z

export const generateWeatherData = (location) => {
    // 1. user has provided the location (cityName) if that city is in our database then return that city else return error
    const city = cityData.find((c) => c.cityName.toLowerCase() === location.toLowerCase());

    if (!city) return { error: "❌ City not found, error from file: data/mockWeatherData.js" };

    // 2. According to selected city select weather condition at random
    const condition = city.conditions[Math.floor(Math.random() * city.conditions.length)];

    const key = formatString(condition);
    console.log("selected condition", key);
    const weather = weatherData.find((w) => Object.keys(w)[0] === key)?.[key];

    if (!weather)
        return { error: "❌ No weather data for condition, error from file: data/mockWeatherData.js" };

    const temperature = rand(city.minTemp, city.maxTemp);
    const windSpeed = rand(weather.windSpeed.min, weather.windSpeed.max);
    const humidity = rand(weather.humidity.min, weather.humidity.max);

    return {
        location: city.cityName,
        temperature: Number(temperature.toFixed(1)),
        windSpeed: Number(windSpeed.toFixed(1)),
        humidity: Number(humidity.toFixed(1)),
        generalCondition: condition,
    };
};
