const express = require("express");
const { authenticateToken } = require("../Authentication/AuthToken");
const router = express.Router();
const { Data, User } = require("../dbConfigs/dbConnect");
const { authorizeRole } = require("../Authentication/AuthToken");

router.get("/get-all-projects", authenticateToken, async (req, res) => {
  Data.find({}).then((data) => {
    res.json(data);
  });
});

router.get("/get-data/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const dataEntry = await Data.findById(id);
    if (!dataEntry) return res.status(404).send("Data not found");

    res.json(dataEntry);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});

router.post(
  "/add-data",
  authenticateToken,
  authorizeRole(["admin", "user"]),
  async (req, res) => {
    try {
      const data = new Data({
        userId: req.user?.userId,
        title: req.body.title,
        contentId: req.body.contentId,
        description: req.body.description,
      });

      await data.save();
      res.status(201).send("Data added successfully!");
    } catch (error) {
      res.status(500).send("Error adding data: " + error.message);
    }
  }
);

module.exports = router;
