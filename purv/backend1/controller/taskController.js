const Task = require("../model/taskSchema");

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      title,
      description,
    });
    res.send(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getTask = async (req, res) => {
  const task = await Task.find();
  res.send(task);
};

const updatetask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id);
    res.send(task);
  } catch (error) {
    res.send("error", error);
  }
};

const getbyId = async (req, res) => {
  const gettask = await Task.findById(req.params.id);
  res.send(gettask);
};
const deleteTask = async (req, res) => {
  const deletetask = await Task.findByIdAndDelete(req.params.id);
  res.send(deletetask);
};
module.exports = { addTask, getTask, updatetask, deleteTask,getbyId };
