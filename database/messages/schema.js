import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;