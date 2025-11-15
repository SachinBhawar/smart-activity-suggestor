import fs from "fs/promises"; // async readFile
import path from "path";
import { fileURLToPath } from "url";
import ActivityRuleModel from "../models/activityRuleModel.js";

// Compute __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data.json
const DATA_FILE_PATH = path.join(__dirname, "../data/data.json");

async function checkAndSeedData() {
    try {
        const count = await ActivityRuleModel.countDocuments();

        if (count > 0) return; // DB already seeded

        let initialData = [];

        try {
            console.log(`Attempting to read data from ${DATA_FILE_PATH}...`);

            const data = await fs.readFile(DATA_FILE_PATH, "utf8"); // async read

            initialData = JSON.parse(data);

            console.log(`Successfully parsed ${initialData.length} records from ${DATA_FILE_PATH}.`);
        } catch (fileError) {
            console.error(`❌ Error reading or parsing ${DATA_FILE_PATH}: ${fileError.message}`);
            throw new Error(
                "Failed to load initial data from data.json. Ensure the file exists and is valid JSON."
            );
        }

        const result = await ActivityRuleModel.insertMany(initialData);

        console.log(
            `🎉 Successfully inserted ${result.length} documents into '${ActivityRuleModel.collection.name}'.`
        );
    } catch (error) {
        console.error("❌ Data seeding failed:", error.message);
    }
}

export default checkAndSeedData;
