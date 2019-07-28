const express = require("express");
const router = express.Router();
const db = require("./data/db");

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = await db.insert(req.body);
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
