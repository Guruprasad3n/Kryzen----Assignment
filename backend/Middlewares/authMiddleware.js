// authMiddleware.js

const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Access Denied. Token Required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decodedToken.userId };
    next(); 
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = authenticateUser;
