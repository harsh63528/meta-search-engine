import express from "express";
import { historyController, trackClickController } from "../controllers/history.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, historyController);
router.post("/click", authMiddleware, trackClickController);

export default router;
