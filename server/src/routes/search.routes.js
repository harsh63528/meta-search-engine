import express from "express";
import searchController from "../controllers/search.Controller.js";
import authMiddleware from "../middleware/auth.Middleware.js";

const router = express.Router();

router.get("/", authMiddleware, searchController);

export default router;
