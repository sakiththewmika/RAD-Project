import express from 'express';
import { port, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js'
import loginRoute from './routes/loginRoute.js'
import serviceRoute from './routes/serviceRoutes.js'
import categoryRoute from './routes/categoryRoutes.js'
import mediaRoute from './routes/mediaRoutes.js'
import typeRoute from './routes/typeRoutes.js'
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware to parsing request body
app.use(express.json());

//middleware to serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

//middleware to handling cors policy
//option 2 - allow only specific origin
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the server!');
});

//middleware to handle routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/service', serviceRoute);
app.use('/category', categoryRoute);
app.use('/media', mediaRoute);
app.use('/type', typeRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });