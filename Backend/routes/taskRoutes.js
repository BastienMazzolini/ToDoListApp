const express = require('express');
const router = express.Router();
const {
    getTasksAfter,
    simulateTasks,
    deleteAllTasks
    } = require ('../controllers/taskController');

router.get('/tasks', getTasksAfter);
router.post('/simulate', simulateTasks);
router.delete('/tasks', deleteAllTasks);

module.exports = router;