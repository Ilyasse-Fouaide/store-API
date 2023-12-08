const customError = require("../error-handling/customError");

const notFound = (req, res, next) => {
  next(customError(`no route match with ${req.url}`, 500));
}

module.exports = notFound;
