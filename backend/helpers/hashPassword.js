// import bcrypt
const bcrypt = require("bcrypt");

// function to hash the password and add salt
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// function to compare both, input password with the one already hashed and saved in database
const comparePassword = async (entered, hashed) => {
  return await bcrypt.compare(entered, hashed);
};
// export both functions
module.exports = { hashPassword, comparePassword };
