const express = require('express');
const bodyParser = require('body-parser');
const nanoid = require('nanoid');
const connectToDatabase = require('./db');
const dotenv = require('dotenv');
dotenv.config();

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3009;
app.use(bodyParser.json());

let messages = [];

// Create a new message
app.post('/messages', (req, res) => {
    const { title, description } = req.body;
    const newMessage = { id: nanoid(), title, description };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
