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

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);

    res.status(200).json(comments);
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

// router.post("/:id/comments", async (req, res) => {
//   const { text } = req.body;
//   console.log(req.body);
//   try {
//     const comment = { text, post_id: req.params.id };
//     const { id } = await db.insertComment(comment);
//     const insertedComment = await db.findCommentById(id);

//     res.status(201).json(insertedComment);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await db.update(req.params.id, req.body);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
