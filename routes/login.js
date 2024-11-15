const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//const bcrypt = require("bcrypt");
const { User } = require("../dbConfigs/dbConnect");
const JWT_SECRET =
  require("../Authentication/tokenSecrete").ACCESS_TOKEN_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await verifyPassword(password, user.salt, user.password))) {
      return res.status(401).send("Invalid username or password.");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});
async function verifyPassword(password, salt, storedHash) {
  const hash = await crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === storedHash;
}
module.exports = router;
