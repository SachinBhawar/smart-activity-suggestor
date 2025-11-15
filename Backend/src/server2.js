import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ActivityRule from "./models/activityRuleModel.js";
import { getMockWeatherData } from "./data/mockWeatherData.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Routes

// A. Rule Management - POST /api/rules
app.post("/api/rules", async (req, res) => {
    try {
        const { condition, minTemp, maxTemp, activitySuggestion } = req.body;

        const newRule = new ActivityRule({
            condition,
            minTemp,
            maxTemp,
            activitySuggestion,
        });

        const savedRule = await newRule.save();
        res.status(201).json({ data: savedRule, error: null });
    } catch (error) {
        res.status(400).json({ data: null, error: error.message });
    }
});

// A. Rule Management - GET /api/rules
app.get("/api/rules", async (req, res) => {
    try {
        const rules = await ActivityRule.find();
        res.json({ data: rules, error: null });
    } catch (error) {
        res.status(500).json({ data: null, error: error.message });
    }
});

// B. Core Feature Endpoint - GET /api/weather/:location
app.get("/api/weather/:location", async (req, res) => {
    try {
        const { location } = req.params;

        // 1. Retrieve Mock Data
        const mockData = getMockWeatherData(location);

        if (!mockData) {
            return res.status(404).json({ error: "Location not found" });
        }

        // 2. Retrieve Rules
        const rules = await ActivityRule.find();

        // 3. Process and Match
        let matchedSuggestion = "No suitable activity found";

        for (const rule of rules) {
            if (
                mockData.generalCondition === rule.condition &&
                mockData.temperature >= rule.minTemp &&
                mockData.temperature <= rule.maxTemp
            ) {
                matchedSuggestion = rule.activitySuggestion;
                break; // Use first matching rule
            }
        }

        // 4. Consolidate Response
        const response = {
            location: mockData.location,
            weather: {
                temperature: mockData.temperature,
                windSpeed: mockData.windSpeed,
                humidity: mockData.humidity,
                generalCondition: mockData.generalCondition,
            },
            activitySuggestion: matchedSuggestion,
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
