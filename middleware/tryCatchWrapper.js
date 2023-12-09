const customError = require("../error-handling/customError");

const tryCatchWrapper = (cb) => {
  return async (res, req, next) => {
    try {
      await cb(res, req, next);
    } catch (error) {
      next(customError(error, 500));
    }
  }
};

module.exports = tryCatchWrapper;
