import Message from './schema.js';

const createMessage = async (messageData) => {
    try {
        const message = new Message(messageData);
        await message.save();
        return message;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllMessages = async () => {
    try {
        const messages = await Message.find();
        return messages;
    } catch (error) {
        throw new Error('Failed to get messages');
    }
};

const getMessageById = async (_id) => {
    try {
        const message = await Message.findById(_id);
        return message;
    } catch (error) {
        throw new Error('Failed to get message');
    }
};

const updateMessageById = async (id, updatedData) => {
    try {
        const message = await Message.findByIdAndUpdate(id, updatedData, { new: true });
        return message;
    } catch (error) {
        throw new Error('Failed to update message');
    }
};

const deleteMessageById = async (id) => {
    try {
        await Message.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Failed to delete message');
    }
};

export {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageById,
    deleteMessageById,
};