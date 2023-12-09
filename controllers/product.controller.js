const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  const { features, company, search, limit, sort } = req.query;

  const query = {}

  if (features) {
    query.features = features
  }

  if (company) {
    query.company = company
  }

  if (search) {
    // find({ $or: [{query}, {query}] });
    // then the query object must be object: { ..., $or: [{}, {}] } 
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]
  }

  const products = await Product
    .find(query)
    .limit(limit ? parseInt(limit) : null)
    .sort(sort ? sort : null)
    .select({ __v: 0 });  // projection

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
