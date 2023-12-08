const mongoose = require('mongoose');
const config = require('../config/config');

const connect = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connect;
