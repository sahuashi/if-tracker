import express from 'express';
import user from '../models/user.js';

var router = express.Router()

router.get('/', (req, res) => {
    res.send('user route works!')
});

export default router;