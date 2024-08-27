import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET } from '../config.js';

export const loginUser = async (email, password, role) => {
    const user = await User.findOne({ email, role });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};
