import express from 'express';
import { register, login } from '../controllers/users.js'
var router = express.Router()

router.get('/', (req, res) => {
    res.send('main user route')
});

router.get('/signup', (req, res) => {
    res.send('GET: user signup route')
});

router.post('/signup', register);

router.post('/login', login);

export default router;