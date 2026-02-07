import imageService from "./image.service.js";
import videoService from "./video.service.js";
import webService from "./web.service.js";
import articleService from "./article.service.js";
import SearchHistory from "../models/searchHistory.model.js";
import removeDuplicates from "../utils/removeDuplicates.js";

const searchService = async (query, type) => {

  let results = [];

  if (type === "image") {
    results = await imageService(query);
  }

  else if (type === "video") {
    results = await videoService(query);
  }

  else if (type === "web") {
    results = await webService(query);
  }

  else if (type === "article") {
    results = await articleService(query);
  }

  else {
    // Call ALL services in parallel
    const [
      images,
      videos,
      web,
      articles
    ] = await Promise.all([
      imageService(query),
      videoService(query),
      webService(query),
      articleService(query)
    ]);

    results = [
      ...images,
      ...videos,
      ...web,
      ...articles
    ];
  }

  // Remove duplicates
  const cleanedResults = removeDuplicates(results);

  // Store search history
await SearchHistory.create({
  query,
  type: type || "all",
  totalResults: cleanedResults.length
});


  return cleanedResults;
};

export default searchService;
