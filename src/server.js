const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const handle500error = require("./errorhandler/500");
const handle404 = require("./errorhandler/404");
const { basicAuth } = require("./auth/authentication");
const { Users } = require("./model/index");

app.get("/", (req, res) => {
  res.send("hello ");
});
app.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    const records = await Users.findAll();
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send("not valid");
  }
});

app.post("/signin", basicAuth, (req, res, next) => {
  res.status(200).json({ username: req.username });
});

app.use("*", handle404);
app.use(handle500error);

function start() {
  app.listen(process.env.PORT || 5000, () => console.log("server up"));
}

module.exports = {
  start: start,
  server: app,
};
