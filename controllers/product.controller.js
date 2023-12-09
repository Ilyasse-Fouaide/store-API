const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");

module.exports.index = tryCatchWrapper(async (req, res) => {
  const { features, company, rating, price, search, sort, select } = req.query;
  const limit = req.query.limit || 4;

  const query = {}

  if (features) {
    query.features = features
  }

  if (company) {
    query.company = company
  }

  if (rating) {
    query.rating = { $gte: Number(rating) }
  }

  if (price) {
    query.price = { $gte: Number(price) };
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
    .sort(sort ? sort.split(",").join(" ") : 'createdAt')
    .select(select ? select.split(",").join(" ") : "-__v");

  // ! ********* or u can use this method instead **********
  // let results = Product.find(query);

  // if (limit) {
  //   results.limit(parseInt(limit));
  // }

  // if (sort) {
  //   results.sort(sort.split(",").join(" "));
  // } else {
  //   results.sort({ createdAt: -1 });
  // }

  // if (select) {
  //   results.select(select.split(",").join(" "));
  // } else {
  //   results.select("-__v")
  // }

  // const products = await results;

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
