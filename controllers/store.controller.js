const tryCatchWrapper = require("../middleware/tryCatchWrapper");

module.exports.index = tryCatchWrapper(async (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});
