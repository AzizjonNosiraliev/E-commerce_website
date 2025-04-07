const router = require("express").Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.get("/", (req, res) => res.json("welcome to router!"));

// localhost:8824/api/products/allProducts
router.get("/allProducts", getAllProducts);
// localhost:8824/api/products/:id
router.get("/:id", getProductById);
// localhost:8824/api/products/createProduct
router.post("/createProduct", createProduct);
// localhost:8824/api/products/:id
router.put("/:id", updateProduct);
// localhost:8824/api/products/:id
router.delete("/:id", deleteProduct);

// export router
module.exports = router;
