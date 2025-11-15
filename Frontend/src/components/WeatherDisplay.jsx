import React, { useState } from "react";

const WeatherDisplay = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [activitySuggestion, setActivitySuggestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeatherData = async (e) => {
        e.preventDefault();
        if (!location.trim()) return;

        setLoading(true);
        setError("");
        setWeatherData(null);

        try {
            const response = await fetch(`http://localhost:3600/api/weather/${encodeURIComponent(location)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch weather data");
            }

            const result = await response.json();
            setWeatherData(result.data?.weather);
            setActivitySuggestion(result.data?.activity);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getConditionIcon = (condition) => {
        const icons = {
            Sunny: "☀️",
            Cloudy: "☁️",
            PartlyCloudy: "⛅",
            Rainy: "🌧️",
            Thunderstorms: "⛈️",
            Snowy: "❄️",
            Foggy: "🌫️",
            Windy: "💨",
            Hazy: "🌫️",
            Drizzle: "🌦️",
            Stormy: "🌩️",
            Overcast: "☁️☁️",
            Humid: "💦",
            Clear: "🌤️",
        };
        return icons[condition] || "🌈";
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Search Form */}
            <form onSubmit={fetchWeatherData} className="mb-8">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter a city name..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 hover:shadow-md bg-white"
                    />

                    <button
                        type="submit"
                        disabled={loading || !location.trim()}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Loading..." : "Search"}
                    </button>
                </div>
            </form>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Weather Data Display */}
            {weatherData && (
                <div className="space-y-6">
                    {/* Location Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{weatherData.location}</h2>
                        <div className="flex items-center justify-center gap-2 text-xl text-gray-600">
                            <span className="text-4xl">{getConditionIcon(weatherData.generalCondition)}</span>
                            <span>{weatherData.generalCondition}</span>
                        </div>
                    </div>

                    {/* Weather Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-red-200 rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-600">Temperature</p>
                            <p className="text-2xl font-bold text-gray-800">{weatherData.temperature}°C</p>
                        </div>
                        <div className="bg-yellow-200 rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-600">Wind Speed</p>
                            <p className="text-2xl font-bold text-gray-800">{weatherData.windSpeed} km/h</p>
                        </div>
                        <div className="bg-green-200 rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-600">Humidity</p>
                            <p className="text-2xl font-bold text-gray-800">{weatherData.humidity}%</p>
                        </div>
                    </div>

                    {/* Activity Suggestion */}
                    <div className="bg-green-500 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Suggested Activity</h3>
                        <p className="text-2xl font-bold">
                            {activitySuggestion || "Activity cannot be suggested now. Please try later."}
                        </p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">Fetching weather data...</p>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
