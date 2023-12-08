const tryCatchWrapper = (cb) => {
  return async (res, req, next) => {
    try {
      await cb(res, req, next);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          status: 500,
          message: "Internal Server Error"
        }
      });
    }
  }
};

module.exports = tryCatchWrapper;
