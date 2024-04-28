import {
    createUser,
    getUserByEmail,
    login
} from '../database/user/model.mjs';
import jwt from 'jsonwebtoken';

export const loginController = (req, res) => {
    login(req.body)
        .then((user) => {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256'});
            res.status(200).json( token );
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

export const registerController = (req, res) => {
    createUser(req.body)
        .then(() => {
            res.status(201).send('Cadastrado com sucesso');
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

export const getUserByEmailController = (req, res) => {
    getUserByEmail(req.params.email)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(404).send();
        });
}; 
