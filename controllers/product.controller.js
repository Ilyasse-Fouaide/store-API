const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

module.exports.store = tryCatchWrapper(async (res, req, next) => {
  const products = [...data];
  res.status(200).json({ products });
})
