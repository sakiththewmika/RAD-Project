import express from 'express';
import Type from '../models/typeModel.js';
import Service from '../models/serviceModel.js';
import { authentication, authorization } from '../middleware/auth.js';

const router = express.Router();

//route to save a new type
router.post('/', authentication, authorization(['admin']), async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const newType = { name: req.body.name };
        const createdType = await Type.create(newType);
        return res.status(201).send(createdType);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all types
router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        return res.status(200).send({
            count: types.length,
            data: types
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get a type by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const type = await Type.findById(id);
        if (type) {
            return res.status(200).send(type);
        }
        return res.status(404).send({ message: 'Type not found' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to update a type by id
router.put('/:id', authentication, authorization(['admin']), async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const { id } = req.params;
        const updatedType = await Type.findByIdAndUpdate(id, { name: req.body.name }, { new: true });

        if (!updatedType) {
            return res.status(404).send({ message: 'Type not found' });
        }

        //update the type name in the service collection
        await Service.updateMany(
            { 'type._id': id },
            { $set: { 'type.name': req.body.name } }
        );

        return res.status(200).send({ message: 'Type updated successfully', data: updatedType });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete a type by id
router.delete('/:id', authentication, authorization(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedType = await Type.findByIdAndDelete(id);

        if (!deletedType) {
            return res.status(404).send({ message: 'Type not found' });
        }

        //remove the type reference from services
        await Service.updateMany(
            { 'type._id': id },
            { $unset: { type: '' } }
        );

        return res.status(200).send({ message: 'Type deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;