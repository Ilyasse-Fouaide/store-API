const express = require("express");
const store = require("../controllers/store.controller");

const router = express.Router();

router.route("/")
  .get(store.index);

module.exports = router
