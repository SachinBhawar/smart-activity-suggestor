import express from "express";
import { suggestActivity } from "../controllers/activityController.js";

const weatherRouter = express.Router();

weatherRouter.get("/:location", suggestActivity);

export default weatherRouter;
