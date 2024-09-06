import express from 'express';
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
        fileSize: 1024 * 1024 * 5 // 5MB max file size
    },
    fileFilter: fileFilter
});

router.use('/uploads', express.static(`${__dirname}/uploads`));

// Route to register a new user
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
            profilePhoto: req.file ? req.file.path : null // Save file path if uploaded

        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Route to get all users
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

//route to get a user by id
// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         if (user) {
//             return res.status(200).send(user);
//         }
//         return res.status(404).send({ message: 'User not found' });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

//route to update a user by id
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.role
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const { id } = req.params;
        const result = await User.findByIdAndUpdate(id, req.body);

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
router.put('/password/:id', authentication, authorization(['planner', 'provider', 'admin']), async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        const { id } = req.params;
        const result = await User.findByIdAndUpdate(id, { password: req.body.password });

        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'Password updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to change user email by previous email and role
router.put('/email', authentication, authorization(['planner', 'provider', 'admin']), async (req, res) => {
    try {
        if (!req.body.email || !req.body.newEmail || !req.body.role) {
            return res.status(400).send({ message: 'Email and role are required' });
        }
        const result = await User.findOneAndUpdate(
            { email: req.body.email, role: req.body.role },
            { email: req.body.newEmail }
        );

        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'Email updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete a user by id
router.delete('/:id', authentication, authorization(['planner', 'provider', 'admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// //route to get all lists by userID with services
// router.get('/lists/:userID', async (req, res) => {
//     try {
//         const { userID } = req.params;
//         const user = await User.findById(userID);
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }
//         return res.status(200).send({
//             count: user.lists.length,
//             data: user.lists
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });



// //route to add list to user by userID
// router.post('/lists/:userID', async (req, res) => {
//     try {
//         const { userID } = req.params;
//         const user = await User.findById(userID);
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }
//         user.lists.push(req.body);
//         await user.save();
//         return res.status(200).send({ message: 'List added successfully' });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

// //route to update list by id
// router.put('/lists/:id', async (req, res) => {
//     try {
//         if (!req.body.name) {
//             return res.status(400).send({ message: 'Name is required' });
//         }
//         const { id } = req.params;
//         const user = await User.findOneAndUpdate(
//             { 'lists._id': id },
//             { $set: { 'lists.$.name': req.body.name } }
//         );
//         if (!user) {
//             return res.status(404).send({ message: 'List not found' });
//         }
//         return res.status(200).send({ message: 'List updated successfully' });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

export default router;