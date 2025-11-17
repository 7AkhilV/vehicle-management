import express from 'express';
import { getMyProfile } from '../controllers/user.controller.js';
import { getMyVehicles } from '../controllers/assignment.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /my/profile - Get current user profile
router.get('/profile', [authenticate], getMyProfile);

// GET /my/vehicles - Get current user's vehicles
router.get('/vehicles', [authenticate], getMyVehicles);

export default router;

