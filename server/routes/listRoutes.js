import express from 'express';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const router = express.Router();

//route to add new list to user by userID - test passed
router.post('/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.lists.push(req.body);
        await user.save();
        return res.status(200).send({ message: 'List added successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all lists by userID - test passed
router.get('/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({
            count: user.lists.length,
            data: user.lists
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to update name of list by id - test passed
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const list = await User.findOneAndUpdate(
            { 'lists._id': req.params.id },
            { $set: { 'lists.$.name': req.body.name } },
            { new: true }
        );
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }
        return res.status(200).send({ message: 'List updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete list by id - test passed
router.delete('/:id', async (req, res) => {
    try {
        const list = await User.findOneAndUpdate(
            { 'lists._id': req.params.id },
            { $pull: { lists: { _id: req.params.id } } }
        );
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }
        return res.status(200).send({ message: 'List deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to add service to a list by listID
router.post('/service/:listID', async (req, res) => {
    try {
        const { listID } = req.params;
        const { serviceID } = req.body;
        const list = await User.updateOne(
            { 'lists._id': listID },
            { $addToSet: { 'lists.$.items': serviceID } }
        );
        if (list.nModified === 0) {
            return res.status(404).send({ message: 'Service already exist in the list' });
        }
        return res.status(200).send({ message: 'Service added to list successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//route to add service to a list by listID
router.post('/:userID/list/:listID', async (req, res) => {
    try {
        const { userID, listID } = req.params;
        const { serviceID } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const list = user.lists.id(listID);
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }

        if (!list.items.includes(serviceID)) {
            list.items.push(serviceID);
            await user.save();
            return res.status(200).send({ message: 'Service added to list successfully' });
        } else {
            return res.status(400).send({ message: 'Service already exists in list' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to remove service from a list by listID
router.delete('/:userID/list/:listID/service/:serviceID', async (req, res) => {
    try {
        const { userID, listID, serviceID } = req.params;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const list = user.lists.id(listID);
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }

        if (list.items.includes(serviceID)) {
            list.items.pull(serviceID);
            await user.save();
            return res.status(200).send({ message: 'Service removed from list successfully' });
        } else {
            return res.status(400).send({ message: 'Service does not exist in list' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get services with details in a list by listID - test passed
router.get('/:userID/:listID', async (req, res) => {
    try {
        const { userID, listID } = req.params;

        const user = await User.findById(userID).populate('lists.items');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const list = user.lists.id(listID);
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }

        return res.status(200).send({
            count: list.items.length,
            data: list.items
        });

    } catch (error) {
        console.error('Error fetching services in list:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;