import asyncHandler from "../utils/asyncHandler.js";

const searchController = asyncHandler(async (req, res) => {
  const { q, type } = req.query;

  res.json({
    success: true,
    query: q,
    type: type || "all",
    message: "Search endpoint working"
  });
});

export default searchController;
