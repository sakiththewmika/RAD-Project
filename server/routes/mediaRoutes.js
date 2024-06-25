import express from 'express';
import Media from '../models/mediaModel.js';

const router = express.Router();

//route to save a new user
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.serviceID ||
            !req.body.name
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newMedia = {
            serviceID: body.serviceID,
            name: req.body.name,
        };
        const createdMedia = await Media.create(newMedia);
        return res.status(201).send(createdMedia);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all media
router.get('/', async (req, res) => {
    try {
        const media = await Media.find();
        return res.status(200).send({
            count : media.length,
            data : media
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a media by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const media = await Media.findById(id);
        if(media) {
            return res.status(200).send(media);
        }
        return res.status(404).send({message: 'Media not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a media by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.serviceID ||
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Media.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Media not found'});
        }
        return res.status(200).send({message: 'Media updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a media by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Media.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Media not found'});
        } 
        return res.status(200).send({message: 'Media deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;