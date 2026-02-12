import axios from "axios";

const articleService = async (query) => {
  if (!query) return [];

  try {
    const { data } = await axios.get(
      "https://en.wikipedia.org/w/api.php",
      {
        headers: {
          "User-Agent":
            "OmniiseekMetaSearch/1.0 (your-email@example.com)",
        },
        params: {
          action: "query",
          list: "search",
          srsearch: query,
          format: "json",
        },
        timeout: 5000,
      }
    );

    if (!data?.query?.search) return [];

    return data.query.search.map((item, index) => ({
      id: `wiki-${item.pageid}`,
      title: item.title,
      url: `https://en.wikipedia.org/wiki/${item.title.replace(/ /g, "_")}`,
      snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
      type: "article",
      source: "wikipedia",
    }));

  } catch (error) {
    console.error("Article API Error:", error.response?.data || error.message);
    return [];
  }
};

export default articleService;
