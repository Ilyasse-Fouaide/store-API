const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
  const products = [...data];
  await Product.insertMany(products);
  res.status(200).json({ success: true });
})
