const express = require("express");
const router = express.Router();
//const bcrypt = require("bcrypt");
const { User } = require("../dbConfigs/dbConnect");
const crypto = require("crypto");
router.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = hashPassword(password); //await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword.hash,
      salt: hashedPassword.salt,
      role: role || "user",
    }); // Default to "user" role
    await user.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(400).send("Error signing up: " + error.message);
  }
});

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  // Use PBKDF2 for secure hashing
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}
module.exports = { router };
