import express from 'express';
import { loginUser } from '../services/authService.js';

const router = express.Router();

// Route to login a user
router.post('/', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { token, user } = await loginUser(email, password, role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using https
            maxAge: 3600000, // 1 hour
            sameSite: 'strict'
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
