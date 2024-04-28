import express from 'express';
import bodyParser from 'body-parser';
import connectToDatabase from './database/index.cjs';
import dotenv from 'dotenv';
import router from './router.js';
import jwt from 'jsonwebtoken';

dotenv.config();
connectToDatabase();

const app = express();
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

app.use( (req, res, next) =>{
    req.path === '/login' || req.path === '/register' ? next() : verifyToken(req, res, next);
}, router);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;