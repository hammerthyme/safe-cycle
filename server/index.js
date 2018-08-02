const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//logging middleware//
app.use(morgan("dev"));

//static middleware//
app.use(express.static(path.join(__dirname, "../public")));

//body parsing middleware//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//redirect to specific routes//
app.use("/api", require("./api"));

//send index.html to all incoming requests that don't match an api route//
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// error handling middleware //
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
