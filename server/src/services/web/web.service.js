// src/services/web.service.js

import axios from "axios";

/* ===============================
   GOOGLE SEARCH ENGINE
================================ */
const googleSearch = async (query) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.GOOGLE_CX,
          q: query,
        },
        timeout: 5000,
      }
    );

    if (!data?.items) return [];

    return data.items.map((item, index) => ({
      id: `google-${index}`,
      title: item.title,
      url: item.link,
      snippet: item.snippet,
      type: "web",
      source: "google",
    }));

  } catch (error) {
    console.error(
      "Google Search Error:",
      error.response?.data || error.message
    );
    return [];
  }
};

/* ===============================
   DUCKDUCKGO SEARCH ENGINE
================================ */
const duckduckgoSearch = async (query) => {
  try {
    const { data } = await axios.get(
      "https://api.duckduckgo.com/",
      {
        params: {
          q: query,
          format: "json",
          no_redirect: 1,
          no_html: 1,
        },
        timeout: 5000,
      }
    );

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

  } catch (error) {
    console.error("DuckDuckGo Error:", error.message);
    return [];
  }
};

/* ===============================
   WIKIPEDIA SEARCH ENGINE
================================ */
const wikipediaSearch = async (query) => {
  try {
    const { data } = await axios.get(
      "https://en.wikipedia.org/w/api.php",
      {
        headers: {
          "User-Agent":
            "MetaSearchEngine/1.0 (your-email@example.com)",
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

  } catch (error) {
    console.error("Wikipedia Error:", error.message);
    return [];
  }
};

/* ===============================
   MAIN WEB SERVICE
================================ */
const webService = async (query) => {
  if (!query) return [];

  try {
    const [googleResults, ddgResults, wikiResults] =
      await Promise.all([
        googleSearch(query),
        duckduckgoSearch(query),
        wikipediaSearch(query),
      ]);

    return [
      ...googleResults,
      ...ddgResults,
      ...wikiResults,
    ];

  } catch (error) {
    console.error("Web Service Error:", error.message);
    return [];
  }
};

export default webService;
