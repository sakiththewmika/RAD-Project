import express from 'express';
import Service from '../models/serviceModel.js';
import User from '../models/userModel.js'
import Review from '../models/reviewModel.js'

const router = express.Router();

//route to save a new service
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.userID ||
            !req.body.categoryID ||
            !req.body.description ||
            !req.body.title ||
            !req.body.typeID ||
            !req.body.price
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const newService = {
            userID: req.body.userID,
            category: {
                _id: req.body.categoryID,
                name: req.body.categoryName
            },
            type: {
                _id: req.body.typeID,
                name: req.body.typeName
            },
            description: req.body.description,
            title: req.body.title,
            email: req.body.email,
            mobile: req.body.mobile,
            phone: req.body.phone,
            city: req.body.city,
            price: req.body.price,
            images: req.body.images,
        };
        const createdService = await Service.create(newService);
        return res.status(201).send(createdService);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all services
router.get('/', async (req, res) => {
    try {
        const Services = await Service.find();
        return res.status(200).send({
            count: Services.length,
            data: Services
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all services with user details
router.get('/details', async (req, res) => {
    try {
        const services = await Service.find().populate('userID', 'firstName lastName email');
        return res.status(200).send({
            count: services.length,
            data: services
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all categories in services
router.get('/categories', async (req, res) => {
    try {
        const categories = await Service.find().distinct('category.name');
        return res.status(200).send({
            count: categories.length,
            data: categories
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all types in services
router.get('/types', async (req, res) => {
    try {
        const types = await Service.find().distinct('type.name');
        return res.status(200).send({
            count: types.length,
            data: types
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all cities in services
router.get('/cities', async (req, res) => {
    try {
        const cities = await Service.find().distinct('city');
        return res.status(200).send({
            count: cities.length,
            data: cities
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all services by category
// router.get('/category/:categoryName', async (req, res) => {
//     try {
//         const { categoryName } = req.params;
//         const services = await Service.find({ 'category.name': categoryName });
//         return res.status(200).send({
//             count: services.length,
//             data: services
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

//route to get service by userID
// router.get('/user/:userID', async (req, res) => {
//     try {
//         const { userID } = req.params;
//         const services = await Service.find({ userID: userID });
//         return res.status(200).send({
//             count: services.length,
//             data: services
//         });
//     } catch {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// });

//route to get a service by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (service) {
            return res.status(200).send(service);
        }
        return res.status(404).send({ message: 'Service not found' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to update a service by id
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.userID ||
            !req.body.categoryID ||
            !req.body.typeID ||
            !req.body.description ||
            !req.body.title ||
            !req.body.price
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const { id } = req.params;
        const service = {
            userID: req.body.userID,
            category: {
                _id: req.body.categoryID,
                name: req.body.categoryName
            },
            type: {
                _id: req.body.typeID,
                name: req.body.typeName
            },
            reviews: req.body.reviews,
            description: req.body.description,
            title: req.body.title,
            email: req.body.email,
            mobile: req.body.mobile,
            phone: req.body.phone,
            city: req.body.city,
            price: req.body.price,
            images: req.body.images,
        };
        const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });

        if (!updatedService) {
            return res.status(404).send({ message: 'Service not found' });
        }
        return res.status(200).send({ message: 'Service updated successfully', data: updatedService });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete a service by id and remove it from all lists
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).send({ message: 'Service not found' });
        }

        // remove the service from all lists in users
        await User.updateMany(
            { 'lists.services': id },
            { $pull: { 'lists.$.services': id } }
        );

        return res.status(200).send({ message: 'Service deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;