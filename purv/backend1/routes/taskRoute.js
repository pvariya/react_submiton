const express = require("express");
const { addTask, getTask, updatetask } = require("../controller/taskController");
const router = express.Router();

router.post("/add", addTask);
router.get("/get",getTask)
router.patch("/id",updatetask)
module.exports = router;
