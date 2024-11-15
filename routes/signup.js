const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role: role || "user",
    }); // Default to "user" role
    await user.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(400).send("Error signing up: " + error.message);
  }
});

module.exports = { router };
