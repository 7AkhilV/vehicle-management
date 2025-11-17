import app from './app.js';
import connectDB from './config/database.js';
import env from './config/env.js';

// Connect to database
connectDB();

// Start server
const PORT = env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${env.NODE_ENV || 'development'}`);
  console.log(`Access via: http://localhost:${PORT} or http://YOUR_IP:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

