// router.get("/", async (req, res) => {
//     const userId = req.query.userId; // Get user ID from request

//     if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//     }

//     try {
//         const tasks = await Task.find({ userId }); // Fetch tasks for this user
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.get("/tasks", async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from request
        if (!userId) return res.status(400).send("Missing userId");

        const tasks = await Task.find({ userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// router.post("/", async (req, res) => {
//     const { text, userId } = req.body;

//     if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//     }

//     try {
//         const newTask = new Task({ text, userId });
//         await newTask.save();
//         res.json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.post("/tasks", async (req, res) => {
    try {
        const { text, userId } = req.body; // Get userId from request
        if (!text || !userId) return res.status(400).send("Missing text or userId");

        const newTask = new Task({ text, userId });
        await newTask.save();
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});