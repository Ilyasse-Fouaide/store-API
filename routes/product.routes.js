const express = require("express");
const product = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
  .get(product.index)
  .post(product.store)

module.exports = router
