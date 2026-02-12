// src/services/image.service.js

import axios from "axios";

const PEXELS_URL = "https://api.pexels.com/v1/search";

const imageService = async (query) => {
  if (!query) return [];

  try {
    const { data } = await axios.get(PEXELS_URL, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 10,
      },
      timeout: 5000, // prevent hanging requests
    });

    if (!data || !data.photos || data.photos.length === 0) {
      return [];
    }

    return data.photos.map((photo) => ({
      id: photo.id,
      title: photo.alt || "Untitled Image",
      url:
        photo.src.large2x ||
        photo.src.large ||
        photo.src.medium ||
        photo.src.small,
      width: photo.width,
      height: photo.height,
      photographer: photo.photographer,
      type: "image",
      source: "pexels",
    }));

  } catch (error) {
    console.error("Pexels Image API Error:", error.response?.data || error.message);
    return [];
  }
};

export default imageService;
