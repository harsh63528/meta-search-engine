// dummy article service

const articleService = async (query) => {
  return [
    { title: "Article 1", url: `https://article.com/${query}/1`, type: "article" }
  ];
};

export default articleService;
