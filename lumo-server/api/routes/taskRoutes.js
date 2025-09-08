const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');



// GET /api/tasks - Get all tasks
router.get('/', TaskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post('/', TaskController.createTask);

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
