const tryCatchWrapper = require("../middleware/tryCatchWrapper");
const Product = require("../models/product.model");
const data = require("../data");
const customError = require("../error-handling/customError");

module.exports.index = tryCatchWrapper(async (req, res, next) => {
  const defaultLimit = 4;
  const defaultPage = 1;

  const { features, company, search, sort, select, numericFilter } = req.query;

  const limit = parseInt(req.query.limit) || defaultLimit;
  const page = parseInt(req.query.page) || defaultPage;

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

  // Check if a numeric filter is provided
  if (numericFilter) {
    // Define a mapping of comparison operators to MongoDB operators
    const operators = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    };

    // Define a regular expression to match comparison operators in the numeric filter
    const regEx = /\b(>|>=|<|<=|=)\b/g;

    // Replace each matched operator in the numeric filter with its MongoDB equivalent
    let filters = numericFilter.replace(regEx, (substring) => `-${operators[substring]}-`);

    filters = filters.split(",").map((item) => {
      const [key, op, value] = item.split("-");
      if (['price', 'rating'].includes(key)) {
        return { [key]: { [op]: value } }
      }
      return 'not match'
    })

    // Log the transformed filter string
    console.log(filters);
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

  if (limit > defaultLimit) {
    return next(customError(`the limit number you passed: '${limit}' is higher than expected, the max limit number is '${defaultLimit}'.`, 400));
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
