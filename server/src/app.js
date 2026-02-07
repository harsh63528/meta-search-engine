import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Meta Search Engine API Running 🚀" });
});

// Error Handler (ALWAYS LAST)
app.use(errorHandler);

export default app;
