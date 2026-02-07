const removeDuplicates = (results) => {
  const seen = new Set();

  return results.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
};

export default removeDuplicates;
