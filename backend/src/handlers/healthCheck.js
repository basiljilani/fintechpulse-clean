const response = require('../utils/response');

exports.handler = async (event) => {
  try {
    return response.success({
      message: "Backend deployed successfully!"
    });
  } catch (error) {
    return response.error(error);
  }
};
