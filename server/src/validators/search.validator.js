const VALID_TYPES = ["web", "image", "video", "article", "all"];

/**
 * Validates search query parameters
 * @param {Object} query - Request query with q, type
 * @returns {{ valid: boolean, errors: string[], sanitized: { q: string, type: string } }}
 */
export const validateSearch = (query) => {
  const errors = [];
  const { q, type } = query;

  // Validate query string
  if (!q || typeof q !== "string" || q.trim().length === 0) {
    errors.push("Search query is required");
  } else if (q.trim().length > 500) {
    errors.push("Search query must be less than 500 characters");
  }

  // Normalize and validate type
  let normalizedType = "all";
  if (type) {
    const lower = type.toString().toLowerCase();
    // Handle plural forms
    if (lower === "images") normalizedType = "image";
    else if (lower === "videos") normalizedType = "video";
    else if (lower === "articles") normalizedType = "article";
    else if (lower === "webs") normalizedType = "web";
    else if (VALID_TYPES.includes(lower)) normalizedType = lower;
    else errors.push(`Invalid search type. Must be one of: ${VALID_TYPES.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      q: q ? q.trim() : "",
      type: normalizedType
    }
  };
};

/**
 * Validates click tracking data
 * @param {Object} body - Request body with historyId, url, title, type
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateClickTrack = (body) => {
  const errors = [];
  const { historyId, id, _id, url, link } = body;

  const actualHistoryId = historyId || id || _id;
  const actualUrl = url || link;

  if (!actualHistoryId) {
    errors.push("History ID is required");
  }

  if (!actualUrl || typeof actualUrl !== "string" || actualUrl.trim().length === 0) {
    errors.push("URL is required");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};