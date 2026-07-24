const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from EC2!");
});

app.listen(7070, () => {
  console.log("Server running on port 7070");
});