// import jsonwebtoken(JWT)
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ massage: "Not authorized" });
    }
  } else {
    res.status(401).json({ massage: "No token found" });
  }
};

// export token
module.exports = { protect };
