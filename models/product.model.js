const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name is required!."],
  },
  price: {
    type: Number,
    required: [true, "product price is required!."],
  },
  features: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  company: {
    type: String,
    enum: ['ikea', 'liddy', 'caressa', 'marcos']
  }
}, { timestamps: true });

const Product = model("products", productSchema);

module.exports = Product;
