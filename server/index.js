import express from 'express';
import mongoose from 'mongoose';
import { port, mongoDBURL } from './config.js';
import userRoute from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js';
import serviceRoute from './routes/serviceRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
import mediaRoute from './routes/mediaRoutes.js';
import typeRoute from './routes/typeRoutes.js';
import locationRoute from './routes/locationRoutes.js';
import logoutRoute from './routes/logoutRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse request body
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Middleware to handle CORS
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
        credentials: true // Allow credentials
    })
);

app.options('*', cors());

// Root route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server!');
});

// Middleware to handle routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/service', serviceRoute);
app.use('/category', categoryRoute);
app.use('/media', mediaRoute);
app.use('/type', typeRoute);
app.use('/location', locationRoute);
app.use('/logout', logoutRoute);

// Connect to MongoDB and start server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
