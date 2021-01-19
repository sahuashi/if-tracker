import express from 'express';
import { register, login, logout, checkAuthentication, getAccount } from '../controllers/user.controller.js'
var router = express.Router()

router.get('/', (req, res) => {
    res.send('main user route')
});

router.get('/signup', (req, res) => {
    res.send({route: 'signup'});
});

router.post('/signup', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/account', checkAuthentication, getAccount);

export default router;