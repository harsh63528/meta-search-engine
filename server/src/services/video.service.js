// dummy video service
const videoService = async (query) => {
  return [
    { title: "Video 1", url: `https://video.com/${query}/1`, type: "video" },
    { title: "Video 2", url: `https://video.com/${query}/2`, type: "video" }
  ];
};

export default videoService;
