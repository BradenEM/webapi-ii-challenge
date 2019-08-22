const express = require("express");
const postsRouter = require("./postsRouter");
const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>WebAPI II Challenge<h2>
   `);
});

module.exports = server;
