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

app.get("/", (req, res) => {
    res.send("Welcome to the To-Do List API! Use /tasks to interact.");
});



// Initialize Express Router
const router = express.Router();

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
}

// 🔹 Get tasks for the logged-in user
router.get('/tasks', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.get("/tasks", verifyToken, async (req, res) => {
    const userId = req.user.id; // Get logged-in user's ID

    try {
        const tasks = await Task.find({ userId }); // Fetch only user's tasks
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// 🔹 Add a task for the logged-in user
router.post('/tasks', verifyToken, async (req, res) => {
  const newTask = new Task({ text: req.body.text, userId: req.userId });
  await newTask.save();
  res.json(newTask);
});

router.post("/tasks", verifyToken, async (req, res) => {
    const { text } = req.body;
    const userId = req.user.id; // Get the logged-in user's ID

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const newTask = new Task({ text, userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to add task" });
    }
});

// 🔹 Delete a task
router.delete('/tasks/:id', verifyToken, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

module.exports = router;

