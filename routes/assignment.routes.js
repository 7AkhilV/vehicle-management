import express from 'express';
import { getUserVehicles } from '../controllers/assignment.controller.js';
import { userIdParamSchema } from '../validators/vehicle.validator.js';
import validate from '../middleware/validator.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /users/:userId/vehicles - Get vehicles for specific user (Admin only)
router.get( '/:userId/vehicles', [authenticate, authorize('admin'), validate(userIdParamSchema, 'params')], getUserVehicles);

export default router;

