const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  const { features, company, search, limit } = req.query;

  const query = {}

  if (features) {
    query.features = features
  }

  if (company) {
    query.company = company
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' }
  }

  const products = await Product.find(query, { __v: 0 }, { limit });

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
