import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controllers/auth.controller.js";
import upload from "../middleware/upload.middleware.js";
import { updateProfileImage } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  updateProfileImage
);


export default router;
