// import mongoose and dotenv
const Mongoose = require("mongoose");
require("dotenv").config();

// asynchronous function to connect with MongoDB
const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Database connection is failed: ${error}`);
    process.exit(1);
  }
};
// export the connectDB function
module.exports = connectDB;
