const mongoose = require('mongoose');
const config = require('../config/config');

const connect = () => {
  // protects against query selector injection attacks
  mongoose.set('sanitizeFilter', true);
  return mongoose.connect(config.MONGO_URI);
}

module.exports = connect;
