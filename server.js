const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const database = require("./db");
const fs = require("fs");
const {
  transactionHandler,
  transactionHandlerCallback,
} = require("./controllers/transactionHandler");
const { createTransaction } = require("./controllers/createTransaction");
database.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/home/process", createTransaction);
app.post("/callback/transactionHandle", transactionHandlerCallback);
app.post("/transactionHandle", transactionHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
