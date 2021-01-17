import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyparser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from './models/user.js'
import fastsRouter from './routes/fasts.js'
import userRouter from './routes/user.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-token',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//passport.use(User.createStrategy());
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// adds respective routers to app routes
app.use('/fasts', fastsRouter);
app.use('/user', userRouter);

const mongo = process.env.MONGO_URI;

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , useCreateIndex: true})
    .then(() => app.listen(port, () =>
        console.log(`MongoDB connected and server is running on port: ${port}`)))
    .catch((error) => console.log(error.message));

