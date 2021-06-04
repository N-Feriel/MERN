const jwt = require("jsonwebtoken");
const { PRIVATE_JWT } = process.env;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, PRIVATE_JWT);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Invalid Token",
    });
  }
}

module.exports = auth;
