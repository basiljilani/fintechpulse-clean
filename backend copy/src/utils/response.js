const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  exports.success = (data, statusCode = 200) => ({
    statusCode,
    headers,
    body: JSON.stringify(data)
  });
  
  exports.error = (error, statusCode = 500) => ({
    statusCode,
    headers,
    body: JSON.stringify({
      message: "Internal server error",
      error: error.message
    })
  });
  