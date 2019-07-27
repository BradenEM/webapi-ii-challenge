const express = require("express");
const router = express.Router();
const db = require("./data/db");

router.get("/", (req, res) => {
  try {
    const posts = db.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
