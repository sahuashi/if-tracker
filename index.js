import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyparser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from './models/user.model.js'
import fastsRouter from './routes/fasts.js'
import userRouter from './routes/user.js'
import * as path from 'path';

dotenv.config();

const app = express();


// set up connection to front-end
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// set up passport
app.use(session({
    secret: 'secret-token',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new Strategy(User.authenticate()));

// adds respective routers to app routes
app.use('/fasts', fastsRouter);
app.use('/user', userRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.use('*', express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
// set up mongoDB connection
const mongo = process.env.MONGO_URI;
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , useCreateIndex: true})
    .then(() => app.listen(port, () =>
        console.log(`MongoDB connected and server is running on port: ${port}`)))
    .catch((error) => console.log(error.message));

