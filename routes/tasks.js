router.get("/", async (req, res) => {
    const userId = req.query.userId; // Get user ID from request

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const tasks = await Task.find({ userId }); // Fetch tasks for this user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const { text, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const newTask = new Task({ text, userId });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
