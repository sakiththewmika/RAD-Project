import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import User from '../models/userModel.js';

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
        fileSize: 1024 * 1024 * 5 // 5MB max file size
    },
    fileFilter: fileFilter
});

router.use('/uploads', express.static(`${__dirname}/uploads`));

// route to save a new user
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);

        const { firstName, lastName, email, password, mobile, role } = req.body;

        if (!firstName || !lastName || !email || !password || !mobile || !role) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            mobile,
            role,
            profilePhoto: req.file.path // Save file path
        });

        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error registering user', error });
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