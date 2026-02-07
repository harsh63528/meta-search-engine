import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String,
  clickedAt: {
    type: Date,
    default: Date.now
  }
});

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    query: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["image", "video", "web", "article", "all"],
      default: "all"
    },
    totalResults: {
      type: Number,
      default: 0
    },
    clicks: [clickSchema]  // array of clicked results
  },
  { timestamps: true }
);

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
