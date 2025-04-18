const router = require("express").Router();

const { signup, login } = require("../controller/userController");

// route for Post signup req
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
