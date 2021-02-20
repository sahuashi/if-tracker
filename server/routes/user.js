import express from 'express';
import { register, login, logout, checkAuthentication} from '../controllers/user.controller.js'
var router = express.Router()

router.post('/signup', register);

router.post('/login', login);

router.get('/login', (req, res) => {
    res.send({msg: 'login'});
});

router.get('/logout', logout);

router.get('/auth', checkAuthentication);

export default router;