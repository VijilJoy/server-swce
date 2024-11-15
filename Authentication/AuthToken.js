const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./tokenSecrete").ACCESS_TOKEN_SECRET;
const tokenBlacklist = [];
const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("token: " + token);

  if (token == null) return res.status(401).send("Access denied");
  // Check if token is blacklisted
  if (tokenBlacklist.includes(token))
    return res.status(403).send("Token has been invalidated");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};
const authorizeRole = (role) => (req, res, next) => {
  if (!role.includes(req.user.role))
    return res.status(403).send("Access denied");
  next();
};

module.exports = { authenticateToken, authorizeRole };
