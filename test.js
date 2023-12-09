let numericFilter = 'price>5000,rating=5';
const query = {};

let operators = {
  ">": "$gt",
  ">=": "$gte",
  "=": "$eq",
  "<": "$lt",
  "<=": "$lte"
};

const regEx = /(>|>=|=|<|<=)/g;
let replaceItem = numericFilter.replace(regEx, (subStr) => ` ${operators[subStr]} `);

replaceItem = replaceItem.split(",").map((items) => {
  const [key, op, value] = items.split(' ');
  query[key] = { [op]: value };
});

console.log(query)
