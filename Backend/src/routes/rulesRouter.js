import express from "express";
import { createNewRule, getAllRules } from "../controllers/rulesController.js";

const rulesRouter = express.Router();

rulesRouter.get("/", getAllRules);
rulesRouter.post("/", createNewRule);

export default rulesRouter;
