import asyncHandler from "../utils/asyncHandler.js";
import searchService from "../services/search.service.js";
import SearchHistory from "../models/searchHistory.model.js";

const searchController = asyncHandler(async (req, res) => {
  const { q, type } = req.query;

  if (!q) {
    res.status(400);
    throw new Error("Query is required");
  }

  const results = await searchService(q, type);

  // ✅ Save history only if user is logged in
  if (req.user) {
    await SearchHistory.create({
      user: req.user._id,
      query: q,
      type,
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
