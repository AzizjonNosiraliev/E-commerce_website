// import mongoose
const Mongoose = require("mongoose");

// make schema for products data
const productSchema = new Mongoose.Schema(
  {
    Name: { type: String, require: true },
    Description: String,
    Price: { type: Number, required: true },
    Category: String,
    Stock: Number,
  },
  { timestemps: true }
);

module.exports = Mongoose.model("Product", productSchema);
