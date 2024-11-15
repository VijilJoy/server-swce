const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res
    .status(404)
    .send(
      "<center><h1 style='color:red; font-size: 100px'>404 page not found</h1></center>"
    );
});

module.exports = router;
