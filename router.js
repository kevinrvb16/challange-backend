import { Router } from 'express';
import {
    createMessageController,
    getAllMessagesController,
    getMessageByIdController,
    updateMessageByIdController,
    deleteMessageByIdController
} from './controller/messages.js';
import {
    registerController,
    loginController,
    getUserByEmailController
} from './controller/user.js';

const router = Router();
router.post('/message', (req, res) => {
    createMessageController(req, res);
});

router.get('/message/list', (req, res) => {
    getAllMessagesController(req, res);
});

router.get('/message/:_id', (req, res) => {
    getMessageByIdController(req, res);
});

router.delete('/message/:_id', (req, res) => {
    deleteMessageByIdController(req, res);
});

router.put('/message/:_id', (req, res) => {
    updateMessageByIdController(req, res);
});

router.post('/login', (req, res) => {
    loginController(req, res);
});

router.post('/register', (req, res) => {
    registerController(req, res);
});

router.get('/user/:email', (req, res) => {
    getUserByEmailController(req, res);
});

export default router;