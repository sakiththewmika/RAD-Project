import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

//route to save a new user
router.post('/register', async (req, res) => {
    try {
        if(
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.password ||
            !req.body.mobile ||
            !req.body.role
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(409).send({message: 'User already exists'});
        }

        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            role: req.body.role,
        };
        const createdUser = await User.create(newUser);
        console.log('created user' , createdUser);   
        return res.status(201).send(createdUser);

    } catch (error) {
        console.error('Error creating user' , error);
        res.status(500).send({message: error.message});
    }
});

//route to get all users
router.get('/', async (req, res) => {
    try {
        const Users = await User.find();
        return res.status(200).send({
            count : Users.length,
            data : Users
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a user by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(user) {
            return res.status(200).send(user);
        }
        return res.status(404).send({message: 'User not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a user by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.password ||
            !req.body.mobile ||
            !req.body.role
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await User.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'User not found'});
        }
        return res.status(200).send({message: 'User updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await User.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'User not found'});
        } 
        return res.status(200).send({message: 'User deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;