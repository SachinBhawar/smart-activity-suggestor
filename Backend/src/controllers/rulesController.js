import ActivityRuleModel from "../models/activityRuleModel.js";

export const getAllRules = async (req, res) => {
    try {
        const rules = await ActivityRuleModel.find();
        return res.json({ data: rules, error: null });
    } catch (error) {
        return res.status(500).json({ data: null, error: error.message });
    }
};

export const createNewRule = async (req, res) => {
    try {
        const { condition, minTemp, maxTemp, activitySuggestion } = req.body;

        const newRule = new ActivityRuleModel({
            condition,
            minTemp,
            maxTemp,
            activitySuggestion,
        });

        const savedRule = await newRule.save();
        console.log("✅ New rule added to Database:", savedRule);
        return res.status(201).json({ data: savedRule, error: null });
    } catch (error) {
        console.log(
            "❌ Error occured while adding new rule to Database: error from file (/controllers/rulesController.js) :",
            error.message
        );
        return res.status(400).json({ data: null, error: error.message });
    }
};
