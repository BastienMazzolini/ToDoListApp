const Task = require('../models/task');

exports.getTasksAfter = async (req, res) => {
    try {
        const { after } = req.query;
        const afterDate = after ? new Date(after) : new Date(0);
        const tasks = await Task.find()
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
    const interval = setInterval(async () => {
        if (count >= 5) {
            clearInterval(interval);
            simulateRunning = false;
            return;
        }
        const statuses = ['todo', 'in-progress', 'done'];
        const date = new Date();
        const task = new Task({
            title: `Simulated Task #${date.toLocaleString(("en-GB", { timeZone: "UTC" }))}`,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });;
        await task.save();
        console.log(`Simulated task created: ${task.title} with the statue ${task.status}`);
        count++;
    }, 5000);

    res.json({ message: 'Simulation started', count: 5 });
}

exports.deleteTask = async (req, res) => {
    try {
        const id = req.body;
        if (!id) return res.status(400).json({ message: 'Need ID task' });

        const deletedTask = await Task.FindByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.json({ message: 'Tasks deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};