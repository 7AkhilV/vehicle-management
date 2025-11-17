import rateLimit from 'express-rate-limit';

// General rate limiter for all routes
export const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 5 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

