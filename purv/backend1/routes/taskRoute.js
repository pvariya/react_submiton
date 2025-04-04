const express = require("express");
const {
  addTask,
  getTask,
  updatetask,
  deleteTask,
  getbyId,
} = require("../controller/taskController");
const router = express.Router();

router.post("/add", addTask);
router.get("/get", getTask);
router.patch("/:id", updatetask);
router.delete("/:id", deleteTask);
router.get("/:id", getbyId);
module.exports = router;
