import ActivityRuleModel from "../models/activityRuleModel.js";
import { generateWeatherData } from "../data/mockWeatherData.js";

export const suggestActivity = async (req, res) => {
    try {
        const { location } = req.params;

        // 1. Retrieve Mock Data
        const mockWeatherData = generateWeatherData(location);

        const temp = Number(mockWeatherData.temperature);

        const formattedCondition = formatCondition(mockWeatherData.generalCondition);

        // 2. get records from db which is according to the mockWeatherData
        const results = await ActivityRuleModel.find({
            minTemp: { $lt: temp },
            maxTemp: { $gt: temp },
            condition: formattedCondition,
        }).lean();

        if (results.length === 0)
            return res.status(404).send({
                data: { weather: mockWeatherData, activity: null },
                message: "No relevant activity found...",
            });

        const randomActivity = results[Math.floor(Math.random() * results.length)];

        return res.status(200).json({
            data: { weather: mockWeatherData, activity: randomActivity?.activitySuggestion },
            message: "Activity Suggested",
        });
    } catch (error) {
        console.error("Error occured error from file: controllers/activityController.js", error.message);
        return res.status(400).json({ message: error.message });
    }
};

const formatCondition = (condition) => {
    if (!condition) return "";

    const normalized = condition.toLowerCase().replace(/\s+/g, "");

    // 1 change "partlycloudy" to "Partly Cloudy".
    if (normalized === "partlycloudy") {
        return "Partly Cloudy";
    }

    // 2 capitalize first letter only.
    return condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase();
};
