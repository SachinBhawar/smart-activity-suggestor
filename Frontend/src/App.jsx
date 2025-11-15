import React, { useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import RuleManager from "./components/RuleManager";

function App() {
    const [activeTab, setActiveTab] = useState("weather");

    return (
        <div className="min-h-screen bg-grey-700">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Activity Suggestor</h1>
                    <p className="text-gray-600">
                        Get personalized activity suggestions based on weather conditions of your location
                    </p>
                </header>

                {/* Tab Navigation */}
                {/* <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-inner flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <button
                            onClick={() => setActiveTab("weather")}
                            className={`px-6 py-2 rounded-md font-medium transition-colors w-full sm:w-auto ${
                                activeTab === "weather"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Weather Search
                        </button>
                        <button
                            onClick={() => setActiveTab("rules")}
                            className={`px-6 py-2 rounded-md font-medium transition-colors w-full sm:w-auto ${
                                activeTab === "rules"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Manage Rules
                        </button>
                    </div>
                </div> */}
                {/* {activeTab === "weather" ? <WeatherDisplay /> : <RuleManager />} */}

                <WeatherDisplay />
            </div>
        </div>
    );
}

export default App;
