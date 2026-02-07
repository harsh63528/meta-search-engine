const formatResponse = (success, message, data = null, statusCode = 200) => {
  return {
    statusCode,
    success,
    message,
    ...(data && { data })
  };
};

export default formatResponse;
