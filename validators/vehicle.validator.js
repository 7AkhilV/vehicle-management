import Joi from 'joi';

const currentYear = new Date().getFullYear();

export const createVehicleSchema = Joi.object({
  make: Joi.string().trim().max(50).required().messages({
    'string.empty': 'Vehicle make is required',
    'string.max': 'Make cannot exceed 50 characters'
  }),
  model: Joi.string().trim().max(50).required().messages({
    'string.empty': 'Vehicle model is required',
    'string.max': 'Model cannot exceed 50 characters'
  }),
  year: Joi.number().integer().min(1900).max(currentYear + 1).required().messages({
    'number.base': 'Year must be a number',
    'number.min': 'Year must be 1900 or later',
    'number.max': 'Year cannot be in the future'
  }),
  licensePlate: Joi.string().trim().uppercase().max(20).required().messages({
    'string.empty': 'License plate is required',
    'string.max': 'License plate cannot exceed 20 characters'
  }),
  vin: Joi.string().trim().uppercase().length(17).allow('').messages({
    'string.length': 'VIN must be exactly 17 characters'
  }),
  status: Joi.string().valid('available', 'assigned', 'maintenance').default('available').messages({
    'any.only': 'Status must be one of: available, assigned, maintenance'
  })
});

export const updateVehicleSchema = Joi.object({
  make: Joi.string().trim().max(50).messages({
    'string.max': 'Make cannot exceed 50 characters'
  }),
  model: Joi.string().trim().max(50).messages({
    'string.max': 'Model cannot exceed 50 characters'
  }),
  year: Joi.number().integer().min(1900).max(currentYear + 1).messages({
    'number.base': 'Year must be a number',
    'number.min': 'Year must be 1900 or later',
    'number.max': 'Year cannot be in the future'
  }),
  licensePlate: Joi.string().trim().uppercase().max(20).messages({
    'string.max': 'License plate cannot exceed 20 characters'
  }),
  vin: Joi.string().trim().uppercase().length(17).allow('').messages({
    'string.length': 'VIN must be exactly 17 characters'
  }),
  status: Joi.string().valid('available', 'assigned', 'maintenance').messages({
    'any.only': 'Status must be one of: available, assigned, maintenance'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

export const vehicleIdParamSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid vehicle ID format'
  })
});

export const assignVehicleSchema = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format',
    'string.empty': 'User ID is required'
  })
});

export const userIdParamSchema = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format'
  })
});

