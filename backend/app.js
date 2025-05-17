const express = require("express");
const app = express();
const cors = require("cors");

////////////////////////////////////////////////////
/////////////////// MIDDLEWARES
app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////
/////////////////// ROUTES

app.get("/", (req, res) => {
  res.send("ModMeals api is running...");
});

module.exports = app;
