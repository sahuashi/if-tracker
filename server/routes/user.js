import express from 'express';
import { register, login, logout } from '../controllers/user.controller.js'
var router = express.Router()

router.get('/', (req, res) => {
    res.send('main user route')
});

router.get('/signup', (req, res) => {
    res.send('GET: user signup route')
});

router.post('/signup', register);

router.post('/login', login);

router.get('/logout', logout)

export default router;