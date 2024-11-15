const router = require("express").Router();
const { Data } = require("../dbConfigs/dbConnect");

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const dataEntries = await Data.find({
      $text: { $search: query },
    });
    res.json(dataEntries);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});

module.exports = router;
