// import data
const Product = require("../models/Product");

//* getting all products from the DB
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    // send data to client as response
    res.json({
      message: "success",
      payload: products,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//* getting only one product by its id
const getProductById = async (req, res) => {
  // grab product id and keep that in "id" variable 
  const { id } = req.params;

  try {
    const foundProduct = await Product.findById(id);
    res.status(200).json({
      message: "Found the product",
      product: foundProduct,
    });
  } catch (err) {
    res.status(500).send({
      message: "failure to find the product",
      payload: err,
    });
  }
};

//* create a product
const createProduct = async (req, res) => {
  // extract data from incoming obj from request body
  const { Name, Description, Price, Category, Stock } = req.body;
  try {
    // create newProduct obj and assign data that we got from request body
    let newProduct = {
      Name: Name,
      Description: Description,
      Price: Price,
      Category: Category,
      Stock: Stock,
    };
    // error handling: if the product is already exist, send an error
    if (Product.newProduct) {
      return res.status(400).send({
        message: "Product already exist",
        error: error.message,
      });
    } else {
      // if there is no such product exists then a new product will be created in the DB
      Product.create(newProduct);
    }

    res.status(201).json({
      message: "created a new product!",
      payload: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failure to add a new product",
      error,
    });
  }
};

//* update the product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  // Extract the new product data from the request body
  const { Name, Description, Price, Category, Stock } = req.body;

  try {
    // Find the product by its ID and update it
    const product = await Product.findByIdAndUpdate(
      id,
      { Name, Description, Price, Category, Stock },
      { new: true }
    );

    // If product doesn't exist, return an error
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }

    // Send a success response
    res.status(200).send({
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error(error);
    res.status(500).json({
      message: "Failure to update the product",
      error: error.message || error,
    });
  }
};

//* delete the product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "successfully deleted",
      Product,
    });
  } catch (err) {
    res.status(500).json({
      message: "failure to delete the product",
      err,
    });
  }
};

// export all functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
