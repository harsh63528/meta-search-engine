import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// Register
export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists"
    });
  }

  const user = await User.create({
    name,
    email,
    password
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.STAGE === "production" ? true : false, // true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// Login
export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});


export const updateProfileImage = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  const result = await cloudinary.uploader.upload_stream(
    { folder: "meta-search-profiles" },
    async (error, uploadResult) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Upload failed"
        });
      }

      req.user.profileImage = uploadResult.secure_url;
      await req.user.save();

      res.json({
        success: true,
        profileImage: uploadResult.secure_url
      });
    }
  );

  result.end(req.file.buffer);
});

export const GetProfile = asyncHandler(async (req, res) => {
     const token=req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided"
    });
  }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      res.json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token"
      });
    }

})

