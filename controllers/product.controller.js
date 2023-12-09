const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");
const customError = require("../error-handling/customError");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const defaultLimit = 4;
  const defaultPage = 1;

  const { features, company, rating, price, search, sort, select } = req.query;

  const limit = parseInt(req.query.limit) || defaultLimit;
  const page = parseInt(req.query.page) || defaultPage;

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

  const skip = (page - 1) * limit;

  const products = await Product
    .find(query)
    .limit(limit ? limit : null)
    .sort(sort ? sort.split(",").join(" ") : 'createdAt')
    .select(select ? select.split(",").join(" ") : "-__v")
    .skip(skip);

  // get total documents in the Product collection 
  const count = await Product.countDocuments();

  if (limit > 4) {
    return next(customError(`the limit number you passed: '${limit}' is higher than expected, the max limit number is '${defaultLimit}'`, 400))
  }

  res.status(200).json({
    success: true,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      items: {
        count: products.length,
        totalDocument: count,
        per_page: limit
      }
    },
    products
  });

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
});

module.exports.store = tryCatchWrapper(async (req, res, next) => {
  const products = [...data];
  await Product.insertMany(products);
  res.status(200).json({ success: true });
})
