import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema
} from '../validators/user.validator.js';
import validate from '../middleware/validator.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin only routes
router.post( '/', [authenticate, authorize('admin'), validate(createUserSchema)], createUser);  

router.get( '/', [authenticate, authorize('admin')], getAllUsers);

router.put( '/:id', [authenticate, authorize('admin'), validate(userIdParamSchema, 'params'), validate(updateUserSchema)], updateUser);

router.delete( '/:id', [authenticate, authorize('admin'), validate(userIdParamSchema, 'params')], deleteUser);

export default router;

