const ApiResponse = require('../utils/apiResponse.util');

module.exports = (err, req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json(ApiResponse.error(err.message, err.code, err.stack, err.details));
};
