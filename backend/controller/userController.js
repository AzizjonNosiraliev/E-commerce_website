// import the User module, dotenv, jwt and functions to convert the password
// to hashed password and compare it with the one in the DB
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
require("dotenv").config();

// POST users/signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ massage: "Email already registered" });
    }

    // hash password
    const hashed = await hashPassword(password);

    // create new user
    const user = User.create({ username, email, password: hashed });
    res.status(201).send({ massage: "User registered", user });
  } catch (error) {
    res.status(500).json({ massage: "Server error", error: error.massage });
  }
};
// POST users/login
const login = async (req, res) => {
  try {
    // get email and password properties from input object
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ massage: "Invalid credentials" });

    // compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ massage: "Invalid credentials" });

    // create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // send response contains info about token and the user
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ massage: "Login failed", error: err.massage });
  }
};

// export both controller functions
module.exports = { signup, login };
