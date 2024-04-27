import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import connectToDatabase from './database/index.cjs';
import dotenv from 'dotenv';
import {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageById,
    deleteMessageById,
} from './database/model.cjs';
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
    createMessage(newMessage).then((message) => {
        res.status(201).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

app.get('/messages', (req, res) => {
    getAllMessages().then((messages) => {
        res.status(200).json(messages);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

app.get('/messages/:id', (req, res) => {
    getMessageById(req.params.id).then((message) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

app.delete('/messages/:id', (req, res) => {
    deleteMessageById(req.params.id).then(() => {
        res.status(204).send();
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

app.put('/messages/:id', (req, res) => {
    updateMessageById(req.params.id, req.body).then((message) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
