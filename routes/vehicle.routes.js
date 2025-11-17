import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicle.controller.js';
import {
  assignVehicle,
  unassignVehicle,
  getUserVehicles,
  getMyVehicles
} from '../controllers/assignment.controller.js';
import {
  createVehicleSchema,
  updateVehicleSchema,
  vehicleIdParamSchema,
  assignVehicleSchema,
  userIdParamSchema
} from '../validators/vehicle.validator.js';
import validate from '../middleware/validator.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Vehicle CRUD routes (Admin only)
router.post( '/', [authenticate, authorize('admin'), validate(createVehicleSchema)], createVehicle);

router.get( '/', [authenticate, authorize('admin')], getAllVehicles);

router.get( '/:id', [authenticate, authorize('admin'), validate(vehicleIdParamSchema, 'params')], getVehicleById);

router.put( '/:id', [authenticate, authorize('admin'), validate(vehicleIdParamSchema, 'params'), validate(updateVehicleSchema)], updateVehicle);

router.delete( '/:id',[ authenticate, authorize('admin'), validate(vehicleIdParamSchema, 'params')], deleteVehicle);

// Vehicle assignment routes (Admin only)
router.post( '/:id/assign', [authenticate, authorize('admin'), validate(vehicleIdParamSchema, 'params'), validate(assignVehicleSchema)], assignVehicle);

router.post( '/:id/unassign', [authenticate, authorize('admin'), validate(vehicleIdParamSchema, 'params')], unassignVehicle);


export default router;

