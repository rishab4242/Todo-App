const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false }, // ✅ Ensure completed field exists
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
