const express = require("express");
const {
  registerUser,
  loginUser,
  getAllTasksByUser,
} = require("../Controllers/userController");
const authenticateUser = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/tasks", authenticateUser, getAllTasksByUser);

module.exports = router;
