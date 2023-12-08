const mongoose = require('mongoose');
const config = require('../config/config');

const connect = () => {
  return mongoose.connect(config.MONGO_URI);
}

module.exports = connect;
