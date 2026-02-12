// src/services/search.service.js

import imageService from "./image/image.service.js";
import videoService from "./video/video.service.js";
import webService from "./web/web.service.js";
import articleService from "./article/article.service.js";
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
    const [images, videos, web, articles] = await Promise.all([
      imageService(query),
      videoService(query),
      webService(query),
      articleService(query),
    ]);

    results = [...images, ...videos, ...web, ...articles];
  }

  return removeDuplicates(results, "url");
};

export default searchService;
