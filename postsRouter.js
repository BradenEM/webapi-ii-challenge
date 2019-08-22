const express = require("express");
const router = express.Router();
const db = require("./data/db");

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide a title and contents for the post."
    });
  }
  try {
    const body = await db.insert(req.body);
    res.status(201).json(body);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
  try {
    const comment = await db.insertComment({ text, post_id });

    res.status(201).json(comment);
  } catch (error) {
    if (error.errno === 19) {
      res
        .status(400)
        .json({ message: "The post with the specified ID does not exist." });
    }
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);

    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    const post = await db.update(req.params.id, req.body);

    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
