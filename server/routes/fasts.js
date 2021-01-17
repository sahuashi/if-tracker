import express from 'express';
import { getFasts, addFast, deleteFast } from '../controllers/fast.controller.js'

var router = express.Router()

router.get('/', getFasts);

router.post('/add', addFast);

router.delete('/:id', deleteFast);

export default router;