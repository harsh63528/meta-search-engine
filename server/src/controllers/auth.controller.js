import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

// Helper: Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Helper: Cookie Options (centralized)
const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,               // true in production (HTTPS)
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
  };
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, getCookieOptions());

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// ================= LOGIN =================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id);

  res.cookie("token", token, getCookieOptions());

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// ================= LOGOUT =================
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    ...getCookieOptions(),
    maxAge: 0,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// ================= GET PROFILE =================
export const GetProfile = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
});

// ================= UPDATE PROFILE IMAGE =================
export const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "meta-search-profiles" },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );

      stream.end(req.file.buffer);
    });
  };

  const uploadResult = await uploadToCloudinary();

  req.user.profileImage = uploadResult.secure_url;
  await req.user.save();

  res.status(200).json({
    success: true,
    profileImage: uploadResult.secure_url,
  });
});
