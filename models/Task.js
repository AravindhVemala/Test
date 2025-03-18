const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true } // Store which user added the task
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
