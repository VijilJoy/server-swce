const router = require("express").Router();
const {
  authenticateToken,
  authorizeRole,
} = require("../Authentication/AuthToken");
const { User } = require("../dbConfigs/dbConnect");

router.get(
  "/adminverify",
  authenticateToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    res.status(200).send("admimn");
  }
);

module.exports = router;
