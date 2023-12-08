const express = require("express");
const store = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
  .get(store.index);

module.exports = router
