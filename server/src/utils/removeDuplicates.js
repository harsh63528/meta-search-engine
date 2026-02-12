// src/utils/removeDuplicates.js

const removeDuplicates = (results = [], key = "url") => {
  if (!Array.isArray(results)) return [];

  const seen = new Set();

  return results.filter((item) => {
    const value = item[key];

    if (!value) return true;

    if (seen.has(value)) return false;

    seen.add(value);
    return true;
  });
};

export default removeDuplicates;
