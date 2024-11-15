const router = require("express").Router();
const authenticateToken = require("../Authentication/AuthToken");
const tokenBlacklist = [];

router.post("/logout", authenticateToken, (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token) {
    tokenBlacklist.push(token); // Add token to blacklist
    res.status(200).send("User logged out successfully");
  } else {
    res.status(400).send("Token is required for logout");
  }
});

module.exports = router;
