const { Router } = require("express");
const {
  getTodos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/TodoController");

const router = Router();

router.get("/get", getTodos);
router.post("/save", saveToDo);
router.put("/update/:id", updateToDo);
router.delete("/delete/:id", deleteToDo);

module.exports = router;
