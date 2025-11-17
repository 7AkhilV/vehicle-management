import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Name is required',
    'string.max': 'Name cannot exceed 100 characters'
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  }),
  role: Joi.string().valid('admin', 'user').default('user').messages({
    'any.only': 'Role must be either admin or user'
  }),
  phone: Joi.string().trim().pattern(/^[0-9\-\+\(\)\s]*$/).allow('').messages({
    'string.pattern.base': 'Please provide a valid phone number'
  })
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().max(100).messages({
    'string.max': 'Name cannot exceed 100 characters'
  }),
  email: Joi.string().email().trim().lowercase().messages({
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().min(6).messages({
    'string.min': 'Password must be at least 6 characters'
  }),
  role: Joi.string().valid('admin', 'user').messages({
    'any.only': 'Role must be either admin or user'
  }),
  phone: Joi.string().trim().pattern(/^[0-9\-\+\(\)\s]*$/).allow('').messages({
    'string.pattern.base': 'Please provide a valid phone number'
  }),
  isActive: Joi.boolean()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format'
  })
});

