const express = require("express");
const app = express();
const viewRouter = require("./routes/routes");

module.exports = app;

app.set("view engine", "pug");
app.use("/", viewRouter);
