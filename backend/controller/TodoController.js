const TodoModel = require("../models/TodoModel");

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.userId }); // ✅ Filter by user
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

module.exports.saveToDo = async (req, res) => {
  const { todo } = req.body;

  try {
    const newTodo = await TodoModel.create({
      todo,
      userId: req.userId, // ✅ Must be set
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;

  try {
    const task = await TodoModel.findOne({ _id: id, userId: req.userId }); // ✅ Secure lookup
    if (!task) return res.status(404).json({ message: "Todo not found" });

    task.todo = todo ?? task.todo;
    task.completed = completed ?? task.completed;
    await task.save();

    res.status(200).json({ message: "Todo updated", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TodoModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    }); // ✅ Secure deletion
    if (!task)
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
