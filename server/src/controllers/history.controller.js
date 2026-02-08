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

  let { historyId, id, _id, title, url, link, type } = req.body;

  historyId = historyId || id || _id;
  url = url || link;

  if (!historyId || !url) {
    res.status(400);
    throw new Error("Missing required fields: historyId and url are required");
  }

  const normalizeType = (t) => {
    if (!t) return undefined;
    const lower = t.toString().toLowerCase();
    if (lower === "images") return "image";
    if (lower === "videos") return "video";
    if (lower === "articles") return "article";
    if (lower === "webs") return "web";
    return lower;
  };

  const normalizedType = normalizeType(type);

  const updated = await SearchHistory.findOneAndUpdate(
    {
      _id: historyId,
      user: req.user._id
    },
    {
      $push: {
        clicks: { title, url, type: normalizedType }
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
