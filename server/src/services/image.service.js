import axios from "axios";

const imageService = async (query) => {
  const { data } = await axios.get(
    "https://api.pexels.com/v1/search",
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 10,
      },
    }
  );

  console.log("Pexels Response:", data);

  return data.photos.map((photo) => ({
    id: photo.id,
    title: photo.alt || "Untitled Image",
    url: photo.src.large,
    type: "image",
    source: "pexels",
  }));
};

export default imageService