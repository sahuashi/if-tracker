import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fastsRouter from './routes/fasts.js'
import userRouter from './routes/user.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// adds respective routers to app routes
app.use('/fasts', fastsRouter);
app.use('/user', userRouter);

const mongo = process.env.MONGO_URI;

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(port, () =>
        console.log(`MongoDB connected and server is running on port: ${port}`)))
    .catch((error) => console.log(error.message));

