import asyncHandler from "../utils/asyncHandler.js";
import SearchHistory from "../models/searchHistory.model.js";

/**
 * Get logged-in user's search history
 */
export const historyController = asyncHandler(async (req, res) => {

  const history = await SearchHistory.find({
    user: req.user._id
  })
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({
    success: true,
    total: history.length,
    history
  });
});


/**
 * Track click for a search result
 */
export const trackClickController = asyncHandler(async (req, res) => {

  const { historyId, title, url, type } = req.body;

  if (!historyId || !url) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const updated = await SearchHistory.findOneAndUpdate(
    {
      _id: historyId,
      user: req.user._id
    },
    {
      $push: {
        clicks: { title, url, type }
      }
    },
    { new: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error("Search record not found");
  }

  res.json({
    success: true,
    message: "Click tracked successfully"
  });
});
