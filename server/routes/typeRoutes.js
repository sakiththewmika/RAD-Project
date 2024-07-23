import express from 'express';
import Type from '../models/typeModel.js';

const router = express.Router();

//route to save a new type
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newType = {
            name: req.body.name,
        };
        const createdType = await Type.create(newType);
        return res.status(201).send(createdType);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all types
router.get('/', async (req, res) => {
    try {
        const Types = await Type.find();
        return res.status(200).send({
            count : Types.length,
            data : Types
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a type by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const type = await Type.findById(id);
        if(type) {
            return res.status(200).send(type);
        }
        return res.status(404).send({message: 'Type not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a type by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Type.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Type not found'});
        }
        return res.status(200).send({message: 'Type updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a type by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Type.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Type not found'});
        } 
        return res.status(200).send({message: 'Type deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;