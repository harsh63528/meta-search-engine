import asyncHandler from "../utils/asyncHandler.js";
import searchService from "../services/search.service.js";
import SearchHistory from "../models/searchHistory.model.js";

const searchController = asyncHandler(async (req, res) => {
  const { q, type } = req.query;

  const normalizeType = (t) => {
    if (!t) return "all";
    const lower = t.toString().toLowerCase();
    if (lower === "images") return "image";
    if (lower === "videos") return "video";
    if (lower === "articles") return "article";
    if (lower === "webs") return "web";
    return lower;
  };

  const normalizedType = normalizeType(type);

  if (!q) {
    res.status(400);
    throw new Error("Query is required");
  }

  const results = await searchService(q, normalizedType);

  //  Save history only if user is logged in
  if (req.user) {
    await SearchHistory.create({
      user: req.user._id,
      query: q,
      type: normalizedType,
      totalResults: results.length
    });
  }

  res.json({
    success: true,
    total: results.length,
    results
  });
});

export default searchController;
