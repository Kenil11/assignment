import express from 'express';
import { authUser, registerUser } from '../controller/auth.controller.js';
import { validate } from '../middleware/schema.middleware.js';
import { loginSchema, registerSchema } from '../validator/auth.validator.js';

const router = express.Router();

router.post('/signup', validate(registerSchema),registerUser);
router.post('/login', validate(loginSchema),authUser);

export default router;