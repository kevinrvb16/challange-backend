import {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageById,
    deleteMessageById
} from '../database/messages/model.mjs';

export const createMessageController = (req, res) => {
    const { title, description } = req.body;
    createMessage({ title, description}).then((message) => {
        res.status(201).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

export const getAllMessagesController = (req, res) => {
    getAllMessages().then((messages) => {
        res.status(200).json(messages);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

export const getMessageByIdController = (req, res) => {
    getMessageById(req.params._id).then((message) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

export const updateMessageByIdController = (req, res) => {
    updateMessageById(req.params._id, req.body).then((message) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

export const deleteMessageByIdController = (req, res) => {
    deleteMessageById(req.params._id).then(() => {
        res.status(204).send('Mensagem deletada com sucesso');
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};
