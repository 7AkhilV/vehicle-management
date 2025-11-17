import Vehicle from '../models/Vehicle.js';

/**
 * Create a new vehicle (Admin only)
 * POST /vehicles
 */
export const createVehicle = async (req, res, next) => {
  try {
    const { make, model, year, licensePlate, vin, status } = req.body;

    const vehicle = await Vehicle.create({
      make,
      model,
      year,
      licensePlate,
      vin: vin || undefined,
      status: status || 'available'
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all vehicles (Admin only)
 * GET /vehicles
 */
export const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Vehicles retrieved successfully',
      data: {
        count: vehicles.length,
        vehicles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get vehicle by ID (Admin only)
 * GET /vehicles/:id
 */
export const getVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id).populate('assignedTo', 'name email');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update vehicle (Admin only)
 * PUT /vehicles/:id
 */
export const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete vehicle (Admin only)
 * DELETE /vehicles/:id
 */
export const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

