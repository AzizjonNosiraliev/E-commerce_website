//! ---- IMPORTING & INITIALIZING NECESSARY TOOLS ----------------------------------------|
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// import connection function to the database
const connectDB = require("./config/connectToDb");
// import dotenv to connect with environment variables
require("dotenv").config();
// initialize port
const PORT = process.env.PORT || 3000;
// save the express function in the "app" variable
const app = express();

//! ---- MIDDLEWARE ------------------------------------------------------------------|
// parsing incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// log the incoming requests in the console
app.use(logger("dev"));
// handle cross-origin resource sharing
app.use(cors());

//! ---- RUN THE SERVER & CONNECT TO THE DATABASE --------------------------------------|
// run the server
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}...`);
  // connect to database
  connectDB();
});

//! ---- ROUTES -----------------------------------------------------------------|
// route to home page
app.get("/", (req, res) => res.send("API is running ...."));
// route to "./routes/userRoutes"
app.use("/api/users", userRoutes);
// route to "./routes/productRoutes"
app.use("/api/products", productRoutes);
