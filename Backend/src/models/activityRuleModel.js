import mongoose from "mongoose";

const ActivityRuleSchema = new mongoose.Schema(
    {
        condition: { type: String, required: true },
        minTemp: { type: Number, required: true },
        maxTemp: { type: Number, required: true },
        activitySuggestion: { type: String, required: true },
    },
    {
        timeStamp: true,
        collection: "ActivityRule",
    }
);

const ActivityRuleModel = mongoose.model("ActivityRule", ActivityRuleSchema);

export default ActivityRuleModel;
