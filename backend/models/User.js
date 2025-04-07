// import mangoose 
const Mongoose = require("mongoose");

// create schema for mongoose model
const userSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // adds two fields in the document: createdAt, updatedAt
  { timestamps: true },
);
// export the module
module.exports = Mongoose.model("User", userSchema);

