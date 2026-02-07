import express from "express";
import historyController from "../controllers/history.controller.js";
import { trackClickController } from "../controllers/history.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", historyController);
router.post("/click", authMiddleware, trackClickController);


export default router;
