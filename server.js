const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Allows handling JSON data

// MongoDB Connection
const MONGO_URI = "mongodb+srv://aravindh:lJzpiHue5mveRUUd@testapp.vffcn.mongodb.net/?retryWrites=true&w=majority&appName=Testapp";

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.error("MongoDB connection error:", err));
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


// Task Schema
const TaskSchema = new mongoose.Schema({
    text: String
});

const Task = mongoose.model("Task", TaskSchema);

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a new task
app.post("/tasks", async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Task text is required" });
    }
    const newTask = new Task({ text });
    await newTask.save();
    res.json(newTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
