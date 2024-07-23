import express from 'express';
import Service from '../models/serviceModel.js';

const router = express.Router();

//route to save a new service
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.userID ||
            !req.body.category ||
            !req.body.description ||
            !req.body.title ||
            !req.body.type ||
            !req.body.price 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newService = {
            userID: req.body.userID,
            category: req.body.category,
            description: req.body.description,
            title: req.body.title,
            type: req.body.type,
            address: req.body.address,
            email: req.body.email,
            mobile: req.body.mobile,
            phone: req.body.phone,
            price: req.body.price,
            images: req.body.images,
        };
        const createdService = await Service.create(newService);
        return res.status(201).send(createdService);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all users
router.get('/', async (req, res) => {
    try {
        const Services = await Service.find();
        return res.status(200).send({
            count : Services.length,
            data : Services
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a book by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const service = await Service.findById(id);
        if(service) {
            return res.status(200).send(service);
        }
        return res.status(404).send({message: 'Service not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a user by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body._id ||
            !req.body.userID ||
            !req.body.categoryID ||
            !req.body.description ||
            !req.body.package_title ||
            !req.body.price
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Service.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Service not found'});
        }
        return res.status(200).send({message: 'Service updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a book by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Service.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Service not found'});
        } 
        return res.status(200).send({message: 'Service deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;