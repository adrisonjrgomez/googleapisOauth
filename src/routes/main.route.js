const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("hi");
});

route.get("/fail", (req, res) => {
  res.send("fail");
});

module.exports = route;