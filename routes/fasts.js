import express from 'express';
import { getFasts, getFast, addFast, editFast, deleteFast } from '../controllers/fast.controller.js'

var router = express.Router()

router.get('/', getFasts);

router.get('/:id', getFast);

router.post('/add', addFast);

router.post('/edit/:id', editFast);

router.delete('/:id', deleteFast);

export default router;