export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  'Content-Type': 'application/json'
};

export const success = (data, statusCode = 200) => ({
  statusCode,
  headers,
  body: JSON.stringify(data)
});

export const error = (message, statusCode = 500, reference = '') => ({
  statusCode,
  headers,
  body: JSON.stringify({
    error: message,
    reference,
    timestamp: new Date().toISOString()
  })
});