const router = require("express").Router();
const { authenticateToken } = require("../Authentication/AuthToken");
router.get("/users", authenticateToken, async (req, res) => {
  try {
    dataEntries = await User.find({}); // Return users data
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});

module.exports = router;
