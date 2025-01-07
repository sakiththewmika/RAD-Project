import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname, resolve } from 'path';
import multer from 'multer';
import fs from 'fs';
import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';
import Service from '../models/serviceModel.js';
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
        fileSize: 1024 * 1024 * 5 // 5MB max file size
    },
    fileFilter: fileFilter
});

router.use('/uploads', express.static(`${__dirname}/uploads`));

// Route to register a new user
//post - create
//await - waits db response , async - 

router.post('/register', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobile, role } = req.body;
        var lists = req.body.lists;

        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email, role });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email and role already exists' });
        }


        if (role === 'planner' && (!lists || lists.length === 0)) {
            lists = [
                {
                    name: 'Favorites',
                    items: []
                }
            ];
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            mobile,
            role,
            lists,
            profilePhoto: req.file ? req.file.path : "uploads/Profile.png" // Save file path if uploaded

        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Route to get all users
//get - search/select
router.get('/', authentication, authorization(['admin']), async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to get user details for profile
router.get('/profile', authentication, authorization(['admin', 'planner', 'provider']), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
//Authentication before accessing all routes
//route to update a user by id
//put - update
router.put('/', authentication, authorization(['planner', 'provider', 'admin']), upload.single('profilePhoto'), async (req, res) => {
    try {
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        let email = req.body.email;
        if (await User.findOne({ email: req.body.email, role: req.user.role })) {
            email = req.user.email;
        }
        const edituser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            profilePhoto: req.file ? req.file.path : req.user.profilePhoto
        };
        //db update & stores previous data in result
        const result = await User.findByIdAndUpdate(req.user.id, edituser);

        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to update user password by id

router.put('/password', authentication, authorization(['planner', 'provider', 'admin']), async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        // Find the user by id
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        // Set the new password and save the user (triggers pre-save middleware)
        user.password = password;
        await user.save();

        return res.status(200).send({ message: 'Password updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete a user by id
router.delete('/:id', authentication, authorization(['admin', 'planner', 'provider']), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (result.role === 'provider') {
            // Delete all services by the user
            await Service.deleteMany({ userID: id });
        }
        if (result.role === 'planner') {
            // Delete all reviews by the user
            await Review.deleteMany({ plannerID: id });
        }
        // Delete profile photo
        if (result.profilePhoto !== 'uploads/Profile.png') {
                const pardir = resolve(__dirname, '..');
                const filePath = join(pardir, result.profilePhoto);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                    } 
                });
        }

        return res.status(200).send({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;