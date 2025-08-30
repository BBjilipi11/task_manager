const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router
  .route("/")
  .get(authMiddleware, getAllTasks)
  .post(authMiddleware, createTask);

router
  .route("/:id")
  .get(authMiddleware, getTask)
  .patch(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

module.exports = router;
