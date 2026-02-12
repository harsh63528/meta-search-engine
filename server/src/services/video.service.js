// src/services/video.service.js

import axios from "axios";

const PEXELS_VIDEO_URL = "https://api.pexels.com/videos/search";

const videoService = async (query) => {
  if (!query) return [];

  try {
    const { data } = await axios.get(PEXELS_VIDEO_URL, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 8,
      },
      timeout: 5000,
    });

    if (!data || !data.videos || data.videos.length === 0) {
      return [];
    }

    return data.videos.map((video) => {
      // pick best quality file (prefer HD)
      const bestFile =
        video.video_files.find((file) => file.quality === "hd") ||
        video.video_files[0];

      return {
        id: video.id,
        title: `Video ${video.id}`,
        url: bestFile?.link,
        thumbnail: video.image,
        duration: video.duration,
        width: video.width,
        height: video.height,
        type: "video",
        source: "pexels",
      };
    });

  } catch (error) {
    console.error(
      "Pexels Video API Error:",
      error.response?.data || error.message
    );
    return [];
  }
};

export default videoService;
