const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { addExpense, getExpenses, updateExpense, deleteExpense, getSummary } = require("../controller/expenseController");

const router = express.Router();

router.post("/", authenticate,addExpense); 
router.get("/", authenticate,getExpenses); 
router.put("/:id",  authenticate,updateExpense); 
router.delete("/:id",  authenticate,deleteExpense); 
router.get("/summary",authenticate, getSummary);

module.exports = router;
