// src/services/image.service.js

import axios from "axios";

const pexelsSearch = async (query) => {
  const { data } = await axios.get(
    "https://api.pexels.com/v1/search",
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 8,
      },
      timeout: 5000,
    }
  );

  if (!data?.photos) return [];

  return data.photos.map((photo) => ({
    id: `pexels-${photo.id}`,
    title: photo.alt || "Untitled Image",
    url: photo.src.large2x || photo.src.large,
    width: photo.width,
    height: photo.height,
    type: "image",
    source: "pexels",
  }));
};

const unsplashSearch = async (query) => {
  const { data } = await axios.get(
    "https://api.unsplash.com/search/photos",
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query,
        per_page: 8,
      },
      timeout: 5000,
    }
  );

  if (!data?.results) return [];

  return data.results.map((photo) => ({
    id: `unsplash-${photo.id}`,
    title: photo.alt_description || "Untitled Image",
    url: photo.urls.regular,
    width: photo.width,
    height: photo.height,
    type: "image",
    source: "unsplash",
  }));
};

const imageService = async (query) => {
  if (!query) return [];

  try {
    const [pexelsResults, unsplashResults] = await Promise.all([
      pexelsSearch(query),
      unsplashSearch(query),
    ]);

    return [...pexelsResults, ...unsplashResults];

  } catch (error) {
    console.error("Image Service Error:", error.message);
    return [];
  }
};

export default imageService;
