import asyncHandler from "../utils/asyncHandler.js";
import SearchHistory from "../models/searchHistory.model.js";

const historyController = asyncHandler(async (req, res) => {

  const history = await SearchHistory.find()
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({
    success: true,
    total: history.length,
    history
  });
});

export const trackClickController = asyncHandler(async (req, res) => {

  const { historyId, title, url, type } = req.body;

  if (!historyId || !url) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  const history = await SearchHistory.findOne({
    _id: historyId,
    user: req.user._id
  });

  if (!history) {
    return res.status(404).json({
      success: false,
      message: "Search record not found"
    });
  }

  history.clicks.push({ title, url, type });

  await history.save();

  res.json({
    success: true,
    message: "Click tracked successfully"
  });
});


export default historyController;
