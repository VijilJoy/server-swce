const router = require("express").Router();
const { authenticateToken } = require("../Authentication/AuthToken");
const { User } = require("../dbConfigs/dbConnect");

router.get("/adminverify", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user || user.role !== "admin") {
      return res.status(200).send("user");
    }
    res.status(200).send("notadmin");
  } catch (error) {
    res.status(500).send("Error verifying admin status: " + error.message);
  }
});

module.exports = router;
