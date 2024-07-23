import express from 'express';
import Location from '../models/locationModel.js';

const router = express.Router();

//route to save a new location
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newLocation = {
            name: req.body.name,
        };
        const createdLocation = await Location.create(newLocation);
        return res.status(201).send(createdLocation);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all clocations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        return res.status(200).send({
            count : locations.length,
            data : locations
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a location by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const location = await Location.findById(id);
        if(location) {
            return res.status(200).send(location);
        }
        return res.status(404).send({message: 'Location not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a location by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Location.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Location not found'});
        }
        return res.status(200).send({message: 'Location updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a location by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Location.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Location not found'});
        } 
        return res.status(200).send({message: 'Location deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;