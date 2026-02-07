import express from "express";
import searchRoutes from "./search.routes.js";
import historyRoutes from "./history.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/search", searchRoutes);
router.use("/history", historyRoutes);


export default router;
