import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

//route to login a user
router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(
            !email ||
            !password
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).send({message: 'User not found'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message: 'Invalid credentials'});
        }

        return res.status(200).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        });
        

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;