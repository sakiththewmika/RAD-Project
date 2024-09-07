import express from 'express';
import Service from '../models/serviceModel.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import User from '../models/userModel.js';
import { authentication, authorization } from '../middleware/auth.js';

const router = express.Router();

// Multer configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname); // Unique filename
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only jpeg and png files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB max file size
    },
    fileFilter: fileFilter
});

router.use('/uploads', express.static(`${__dirname}/uploads`));

// Route to save a new service with image upload
router.post('/', authentication, authorization(['provider']), upload.array('images', 5), async (req, res) => {
    try {
        const { userID, categoryID, categoryName, typeID, typeName, description, title, email, mobile, phone, city, price } = req.body;

        if (!userID || !categoryID || !description || !title || !typeID || !price) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Handling image files
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path); // Store file paths in images array
        }

        const newService = {
            userID,
            category: {
                _id: categoryID,
                name: categoryName
            },
            type: {
                _id: typeID,
                name: typeName
            },
            description,
            title,
            email,
            mobile,
            phone,
            city,
            price,
            images // Storing image file paths in the service document
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
router.get('/details', authentication, authorization(['admin']), async (req, res) => {
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

//route to get service by userID
router.get('/user', authentication, authorization(['provider']), async (req, res) => {
    try {
        const services = await Service.find({ userID: req.user.id });
        return res.status(200).send({
            count: services.length,
            data: services
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

//route to get a service by id
router.get('/:id', authentication, authorization(['admin','planner', 'provider']), async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id).populate('userID', 'firstName lastName');
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
router.put('/:id', authentication, authorization(['provider']), upload.array('images', 5), async (req, res) => {
    try {
        const { userID, categoryID, categoryName, typeID, typeName, description, title, email, mobile, phone, city, price } = req.body;

        if (!userID || !categoryID || !description || !title || !typeID || !price) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Handling image files
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path); // Store file paths in images array
        }

        const { id } = req.params;
        const service = {
            userID,
            category: {
                _id: categoryID,
                name: categoryName
            },
            type: {
                _id: typeID,
                name: typeName
            },
            description,
            title,
            email,
            mobile,
            phone,
            city,
            price,
            images // Storing image file paths in the service document
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
router.delete('/:id', authentication, authorization(['admin', 'provider']), async (req, res) => {
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