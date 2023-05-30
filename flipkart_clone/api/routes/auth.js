import express from 'express';
import { login, register, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/signout', signout);

export default router;