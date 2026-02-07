// dummy image service
const imageService = async (query) => {
  return [
    { title: "Image 1", url: `https://img.com/${query}/1`, type: "image" },
    { title: "Image 2", url: `https://img.com/${query}/2`, type: "image" }
  ];
};

export default imageService;
