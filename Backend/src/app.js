import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRouter from "./routes/weatherRouter.js";
import rulesRouter from "./routes/rulesRouter.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://smart-activity-suggestor.onrender.com/",
        ], // array of allowed origins
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

//routes
app.use("/api/rules", rulesRouter);
app.use("/api/weather", weatherRouter);

//get route
app.get("/", (req, res) => {
    return res
        .status(200)
        .send({ message: "welcome to the backend services of Smart Activity Suggestor....!" });
});

export default app;
