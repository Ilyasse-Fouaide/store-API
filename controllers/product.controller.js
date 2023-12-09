const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  const { features, limit } = req.query;

  const products = await Product.find({ features }, undefined, { strict: false, limit, });

  res.status(200).json({
    success: true,
    pagination: {
      total: products.length
    },
    products
  });
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
  const products = [...data];
  await Product.insertMany(products);
  res.status(200).json({ success: true });
})
