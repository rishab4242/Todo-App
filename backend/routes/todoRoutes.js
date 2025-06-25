const { Router } = require("express");
const {
  getTodos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/TodoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get("/get", authMiddleware, getTodos);
router.post("/save", authMiddleware, saveToDo);
router.put("/update/:id", authMiddleware, updateToDo);
router.delete("/delete/:id", authMiddleware, deleteToDo);

module.exports = router;
