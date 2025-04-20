const TodoModel = require("../models/TodoModel");

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find(); // Fetch all todos including completed status
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

module.exports.saveToDo = (req, res) => {
  const { todo } = req.body;

  TodoModel.create({ todo })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.send({ error: err, message: "something went wrong" });
    });
};

module.exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  console.log("🔵 Received Payload in Backend:", req.body); // Debugging

  if (!id || completed === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedTask = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { $set: { todo: req.body.todo, completed: req.body.completed } }, // ✅ Ensure "completed" is updated
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("✅ Task Updated:", updatedTask);
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => {
      res.send({ error: err, message: "Failed to delete" });
    });
};
