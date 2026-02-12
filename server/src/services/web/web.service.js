// src/services/web.service.js

import axios from "axios";

const duckduckgoSearch = async (query) => {
  const { data } = await axios.get("https://api.duckduckgo.com/", {
    params: {
      q: query,
      format: "json",
      no_redirect: 1,
      no_html: 1,
    },
    timeout: 5000,
  });

  let results = [];

  if (data.AbstractURL) {
    results.push({
      id: "ddg-abstract",
      title: data.Heading || query,
      url: data.AbstractURL,
      snippet: data.AbstractText,
      type: "web",
      source: "duckduckgo",
    });
  }

  if (data.RelatedTopics) {
    data.RelatedTopics.forEach((item, index) => {
      if (item.FirstURL) {
        results.push({
          id: `ddg-${index}`,
          title: item.Text?.split(" - ")[0] || query,
          url: item.FirstURL,
          snippet: item.Text,
          type: "web",
          source: "duckduckgo",
        });
      }
    });
  }

  return results;
};

const wikipediaSearch = async (query) => {
  const { data } = await axios.get(
    "https://en.wikipedia.org/w/api.php",
    {
      headers: {
        "User-Agent": "OmniiseekMetaSearch/1.0 (your-email@example.com)",
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
    id: `wiki-${index}`,
    title: item.title,
    url: `https://en.wikipedia.org/wiki/${item.title.replace(/ /g, "_")}`,
    snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
    type: "web",
    source: "wikipedia",
  }));
};

const webService = async (query) => {
  if (!query) return [];

  try {
    const [ddgResults, wikiResults] = await Promise.all([
      duckduckgoSearch(query),
      wikipediaSearch(query),
    ]);

    // Merge both engines
    return [...ddgResults, ...wikiResults];

  } catch (error) {
    console.error("Web Service Error:", error.message);
    return [];
  }
};

export default webService;
