import express from "express";
import searchController from "../controllers/search.Controller.js";

const router = express.Router();

router.get("/", searchController);

export default router;
