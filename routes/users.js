const router = require("express").Router();
const { authenticateToken } = require("../Authentication/AuthToken");
const { User } = require("../dbConfigs/dbConnect");
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}); // Return users data
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});
router.get("/users/:id", authenticateToken, async (req, res) => {
  try {
    const users = await User.findById(req.params.id); // Return users data
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});

module.exports = router;
