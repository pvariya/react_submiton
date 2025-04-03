const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const router = require("./routes/taskRoute");
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/task", router);

app.listen(8090, () => {
  console.log("listen on 8090");
  dbConnect();
});
