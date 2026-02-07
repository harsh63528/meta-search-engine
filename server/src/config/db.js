import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI||"mongodb+srv://vduharsh123_db_user:JLNzbSlEeta24Lzj@cluster0.j8ccbmj.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("Database connection failed "+ error.message);
    process.exit(1);
  }
};

export default connectDB;
