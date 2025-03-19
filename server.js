// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); // Allows handling JSON data

// // MongoDB Connection
// const MONGO_URI = "mongodb+srv://aravindh:lJzpiHue5mveRUUd@testapp.vffcn.mongodb.net/?retryWrites=true&w=majority&appName=Testapp";


// mongoose.connect(MONGO_URI)
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.error("MongoDB connection error:", err));


// // Task Schema
// const TaskSchema = new mongoose.Schema({
//     text: String
// });

// const Task = mongoose.model("Task", TaskSchema);

// // Get all tasks
// app.get("/tasks", async (req, res) => {
//     const tasks = await Task.find();
//     res.json(tasks);
// });

// // Add a new task
// app.post("/tasks", async (req, res) => {
//     const { text } = req.body;
//     if (!text) {
//         return res.status(400).json({ error: "Task text is required" });
//     }
//     const newTask = new Task({ text });
//     await newTask.save();
//     res.json(newTask);
// });

// // Delete a task
// app.delete("/tasks/:id", async (req, res) => {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.get("/", (req, res) => {
//     res.send("Welcome to the To-Do List API! Use /tasks to interact.");
// });



// // Initialize Express Router
// const router = express.Router();

// // Middleware to verify Firebase token
// async function verifyToken(req, res, next) {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.userId = decodedToken.uid;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid Token" });
//   }
// }


// router.get("/tasks", verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from token
//         if (!userId) {
//             return res.status(401).json({ error: "Unauthorized: No user ID found" });
//         }

//         const tasks = await Task.find({ userId }); // Fetch only tasks of the logged-in user
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch tasks" });
//     }
// });



// router.post("/tasks", verifyToken, async (req, res) => {
//     try {
//         const { text } = req.body;
//         const userId = req.user.id; // Get user ID from token

//         if (!userId) {
//             return res.status(401).json({ error: "Unauthorized: No user ID found" });
//         }

//         const newTask = new Task({ text, userId }); // Store task with user ID
//         await newTask.save();
        
//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to add task" });
//     }
// });


// router.delete("/tasks/:id", verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from token
//         const task = await Task.findOne({ _id: req.params.id, userId });

//         if (!task) {
//             return res.status(404).json({ error: "Task not found or unauthorized" });
//         }

//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: "Task deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete task" });
//     }
// });


// module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const admin = require("firebase-admin"); // Ensure Firebase Admin SDK is set up
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());

// const Task = require("./models/Task"); // Import the Task model

// // ✅ Middleware to verify Firebase token
// async function verifyToken(req, res, next) {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token
//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken; // Attach user info to request
//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Invalid Token" });
//     }
// }

// // ✅ Fetch only the tasks of the logged-in user
// app.get("/tasks", verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.uid; // Extract user ID from token
//         const tasks = await Task.find({ userId }); // Fetch only the logged-in user's tasks
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch tasks" });
//     }
// });

// // ✅ Add a new task for the logged-in user
// app.post("/tasks", verifyToken, async (req, res) => {
//     try {
//         const { text } = req.body;
//         const userId = req.user.uid; // Get user ID from token

//         if (!text) {
//             return res.status(400).json({ error: "Task text is required" });
//         }

//         const newTask = new Task({ text, userId }); // Store task with user ID
//         await newTask.save();

//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to add task" });
//     }
// });

// // ✅ Ensure users can only delete their own tasks
// app.delete("/tasks/:id", verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.uid; // Get user ID from token
//         const task = await Task.findOne({ _id: req.params.id, userId });

//         if (!task) {
//             return res.status(404).json({ error: "Task not found or unauthorized" });
//         }

//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: "Task deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete task" });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = require("./firebase-adminsdk.json"); // Ensure this file is set up correctly
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Task Schema
const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true },
});
const Task = mongoose.model("Task", taskSchema);

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

// Get all tasks for the logged-in user
app.get("/tasks", verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Add a new task for the logged-in user
app.post("/tasks", verifyToken, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Task text is required" });
        const newTask = new Task({ text, userId: req.userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to add task" });
    }
});

// Delete a task (only if the user owns it)
app.delete("/tasks/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
        if (!task) return res.status(404).json({ error: "Task not found or unauthorized" });
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

