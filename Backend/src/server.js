import app from "./app.js";
import connectToDatabase from "./config/mongodbConfig.js";
import checkAndSeedData from "./utils/checkAndSeedData.js";

const PORT = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PORT || 8080 : process.env.PORT;

connectToDatabase()
    .then(async () => {
        await checkAndSeedData();

        app.listen(PORT, () => {
            console.log(`✅ App is listening on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error occurred while connecting to the database:", err.message);
    });
