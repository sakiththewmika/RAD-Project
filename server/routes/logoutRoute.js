import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using https
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logout successful' });
});

export default router;
