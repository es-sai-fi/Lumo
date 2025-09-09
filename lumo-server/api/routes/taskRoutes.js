const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
