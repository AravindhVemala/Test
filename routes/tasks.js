
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