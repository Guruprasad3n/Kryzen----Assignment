const express = require("express");
const {
  createTask,
  getAllTasks,
  deleteTask,
  filterTasks,
  updateTask,
} = require("../Controllers/taskController");

const router = express.Router();
router.post("/create-task", createTask);
router.get("/all-tasks", getAllTasks);
router.put("/update-task/:id", updateTask);
router.get("/task/filter", filterTasks);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
