import express from "express";
import searchRoutes from "./search.routes.js";

const router = express.Router();

router.use("/search", searchRoutes);

export default router;
