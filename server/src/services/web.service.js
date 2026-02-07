// dummy web services
const webService = async (query) => {
  return [
    { title: "Web 1", url: `https://web.com/${query}/1`, type: "web" },
    { title: "Web 2", url: `https://web.com/${query}/2`, type: "web" }
  ];
};

export default webService;
