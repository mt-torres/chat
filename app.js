const express = require("express");
const app = express();
const viewRouter = require("./routes/routes");
const path = require("path");

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "../public"))); //servidos arquivos estático para o pug

//preciso pesquisar para q servem esses dois, sei q apos add o o body começou a ser lido
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use("/", viewRouter);

module.exports = app;
