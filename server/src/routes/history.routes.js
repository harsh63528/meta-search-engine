import express from "express";
import { historyController, trackClickController,clearHistory } from "../controllers/history.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, historyController);
router.post("/click", authMiddleware, trackClickController);
router.delete("/clear", authMiddleware, clearHistory);

export default router;
