const Task = require('../models/task');

exports.getTasksAfter = async (req, res) => {
    try {
        const { after } = req.query;
        let filter = {};
        if (after) {
            filter.createdAt = { $gt: new Date(after) };
        }
        const tasks = await Task.find(filter)
            .sort({ createdAt: 1})
            .limit(20);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error});
    }
};

let simulateRunning = false;

exports.simulateTasks = async (req, res) => {
    console.log("Simulate task")
    if (simulateRunning) return res.status(429).json({ message: 'Simulation already running' });

    simulateRunning = true;
    let count = 0;

    const io = req.app.get('io'); 

    const interval = setInterval(async () => {
        if (count >= 10) {
            clearInterval(interval);
            simulateRunning = false;
            return;
        }
        const statuses = ['todo', 'in_progress', 'done'];
        const date = new Date();
        const task = new Task({
            title: `Simulated Task #${date.toLocaleString(("en-GB", { timeZone: "UTC" }))}`,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });;
        await task.save();
        if (io) {
            io.emit('taskCreated');
        }
        count++;
    }, 5000);

    res.json({ message: 'Simulation started', count: 5 });
}

exports.deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.json({ message: 'Tasks deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};