import Vehicle from '../models/Vehicle.js';
import User from '../models/User.js';

/**
 * Assign vehicle to user
 * POST /vehicles/:id/assign
 */
export const assignVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle is already assigned
    if (vehicle.status === 'assigned' && vehicle.assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is already assigned to another user'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot assign vehicle to inactive user'
      });
    }

    // Assign vehicle
    vehicle.assignedTo = userId;
    vehicle.status = 'assigned';
    vehicle.assignmentHistory.push({
      userId: userId,
      assignedAt: new Date()
    });

    await vehicle.save();

    const updatedVehicle = await Vehicle.findById(id).populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Vehicle assigned successfully',
      data: updatedVehicle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unassign vehicle from user
 * POST /vehicles/:id/unassign
 */
export const unassignVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle is assigned
    if (!vehicle.assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is not currently assigned'
      });
    }

    // Update assignment history
    if (vehicle.assignmentHistory.length > 0) {
      const lastAssignment = vehicle.assignmentHistory[vehicle.assignmentHistory.length - 1];
      if (!lastAssignment.unassignedAt) {
        lastAssignment.unassignedAt = new Date();
      }
    }

    // Unassign vehicle
    vehicle.assignedTo = null;
    vehicle.status = 'available';

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: 'Vehicle unassigned successfully',
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get vehicles assigned to a specific user (Admin only)
 * GET /users/:userId/vehicles
 */
export const getUserVehicles = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const vehicles = await Vehicle.find({ assignedTo: userId });

    res.status(200).json({
      success: true,
      message: 'User vehicles retrieved successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        count: vehicles.length,
        vehicles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get vehicles assigned to current user
 * GET /my/vehicles
 */
export const getMyVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ assignedTo: req.user.userId });

    res.status(200).json({
      success: true,
      message: 'Your vehicles retrieved successfully',
      data: {
        count: vehicles.length,
        vehicles
      }
    });
  } catch (error) {
    next(error);
  }
};

