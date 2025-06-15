const express = require('express');
const router = express.Router();
const {
    getTasksAfter,
    simulateTasks,
    deleteTask,
    deleteAllTasks
    } = require ('../controllers/taskController');

router.get('/tasks', getTasksAfter);
router.post('/simulate', simulateTasks);
router.delete('/tasks/:id', deleteTask);
router.delete('/tasks', deleteAllTasks);

module.exports = router;