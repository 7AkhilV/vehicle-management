import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import validate from '../middleware/validator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /auth/register - Register new user
router.post('/register', [authLimiter, validate(registerSchema)], register);

// POST /auth/login - Login user
router.post('/login', [authLimiter, validate(loginSchema)], login);

export default router;

