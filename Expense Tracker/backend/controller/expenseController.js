const Expense = require("../models/ExpenseSchema");

const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount < 0) {
      return res.status(400).json({ message: "Amount cannot be negative" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      userId: req.user.id,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month)
      return res
        .status(400)
        .json({ message: "Month query required (YYYY-MM)" });

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(`${month}-31`);

    const expenses = await Expense.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, description } = req.body; 

   
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

  
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.description = description;

   
    const updatedExpense = await expense.save();

    res.json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteExpense = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is required" });

    const expense = await Expense.findByIdAndDelete(id);
    res.send(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSummary = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month)
      return res
        .status(400)
        .json({ message: "Month query required (YYYY-MM)" });

    // Ensure date parsing is correct
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(`${month}-31`);

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Aggregate data by category
    const summary = await Expense.aggregate([
      {
        $match: {
          userId: req.user.id,  // Ensure the `userId` matches correctly
          date: { $gte: startDate, $lte: endDate },
        },
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary,
};
