// src/services/video.service.js

import axios from "axios";

/* ===============================
   PEXELS VIDEO ENGINE
================================ */
const pexelsVideoSearch = async (query) => {
  const { data } = await axios.get(
    "https://api.pexels.com/videos/search",
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 6,
      },
      timeout: 5000,
    }
  );

  if (!data?.videos) return [];

  return data.videos.map((video) => {
    const bestFile =
      video.video_files.find((f) => f.quality === "hd") ||
      video.video_files[0];

    return {
      id: `pexels-${video.id}`,
      title: `Video ${video.id}`,
      url: bestFile?.link,
      thumbnail: video.image,
      duration: video.duration,
      type: "video",
      source: "pexels",
    };
  });
};

/* ===============================
   YOUTUBE VIDEO ENGINE
================================ */
const youtubeVideoSearch = async (query) => {
  const { data } = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 6,
        type: "video",
      },
      timeout: 5000,
    }
  );

  if (!data?.items) return [];

  return data.items.map((item) => ({
    id: `youtube-${item.id.videoId}`,
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    thumbnail: item.snippet.thumbnails.medium.url,
    type: "video",
    source: "youtube",
  }));
};

/* ===============================
   MAIN VIDEO SERVICE
================================ */
const videoService = async (query) => {
  if (!query) return [];

  try {
    const [pexelsResults, youtubeResults] = await Promise.all([
      pexelsVideoSearch(query),
      youtubeVideoSearch(query),
    ]);

    return [...pexelsResults, ...youtubeResults];

  } catch (error) {
    console.error("Video Service Error:", error.message);
    return [];
  }
};

export default videoService;
