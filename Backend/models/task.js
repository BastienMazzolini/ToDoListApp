const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Task', TaskSchema);