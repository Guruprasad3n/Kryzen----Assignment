const express = require("express");
const {
  createTask,
  getAllTasks,
  deleteTask,
  filterTasks,
  updateTask,
} = require("../Controllers/taskController");
const authenticateUser = require("../Middlewares/authMiddleware");

const router = express.Router();
router.post("/create-task",authenticateUser, createTask);
router.get("/all-tasks", authenticateUser, getAllTasks);
router.put("/update-task/:id", updateTask);
router.get("/task/filter", filterTasks);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;