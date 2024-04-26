const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

let messages = [];

// Create a new message
app.post('/messages', (req, res) => {
    const { title, description } = req.body;
    const newMessage = { id, title, description };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
