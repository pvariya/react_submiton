const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});
ExpenseSchema.index({ date: 1 });
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
