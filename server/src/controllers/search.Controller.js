import asyncHandler from "../utils/asyncHandler.js";
import searchService from "../services/search.service.js";

const searchController = asyncHandler(async (req, res) => {

  const { q, type } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Query is required"
    });
  }

  const results = await searchService(q, type);

  res.json({
    success: true,
    total: results.length,
    results
  });
});

export default searchController;
