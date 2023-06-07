import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './Routes/userRoutes.js';

const app = express();
const port = process.env.PORT || "8000";
const MongoURI = '';

app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);

// Mongo DB
mongoose.connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!")
        // Starting server
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));