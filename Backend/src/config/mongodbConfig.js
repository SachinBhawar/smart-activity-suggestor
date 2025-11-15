import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectToDatabase = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("✅ connected to database successfully...");
    } catch (error) {
        console.error("Error occured while connecting to Database...", error.message);
    }
};

export default connectToDatabase;
