# Vehicle Management Dashboard (RBAC System)

A secure backend API system with Role-Based Access Control (RBAC) to manage users, vehicles, and vehicle assignments.

## Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin and User roles with different permissions
- **User Management** - CRUD operations for users (Admin only)
- **Vehicle Management** - CRUD operations for vehicles (Admin only)
- **Vehicle Assignment** - Assign/unassign vehicles to users
- **Security** - Helmet, rate limiting, input validation with Joi
- **Password Hashing** - Using Node.js crypto module (PBKDF2)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Joi
- **Security:** Helmet, express-rate-limit, crypto

## Project Structure

```
.
├── config/
│   ├── database.js       # MongoDB connection
│   └── env.js           # Environment configuration
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── vehicle.controller.js
│   └── assignment.controller.js
├── middleware/
│   ├── auth.js          # Authentication & authorization
│   ├── errorHandler.js  # Global error handler
│   ├── rateLimiter.js   # Rate limiting
│   └── validator.js     # Validation middleware
├── models/
│   ├── User.js
│   └── Vehicle.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── vehicle.routes.js
│   ├── assignment.routes.js
│   └── my.routes.js
├── utils/
│   ├── crypto.js        # Password hashing
│   └── jwt.js           # JWT utilities
├── validators/
│   ├── auth.validator.js
│   ├── user.validator.js
│   └── vehicle.validator.js
├── app.js               # Express app setup
├── server.js            # Server entry point
└── package.json
```

## Installation

1. **Clone the repository**
```bash
git clone <https://github.com/7AkhilV/vehicle-management.git>
cd vehicle-management-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/vehicle-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=*
CORS_CREDENTIALS=false
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

5. **Run the application**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### User Management (Admin Only)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users` | Create user | Admin |
| GET | `/api/users` | Get all users | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Vehicle Management (Admin Only)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/vehicles` | Create vehicle | Admin |
| GET | `/api/vehicles` | Get all vehicles | Admin |
| GET | `/api/vehicles/:id` | Get vehicle by ID | Admin |
| PUT | `/api/vehicles/:id` | Update vehicle | Admin |
| DELETE | `/api/vehicles/:id` | Delete vehicle | Admin |

### Vehicle Assignment
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/vehicles/:id/assign` | Assign vehicle to user | Admin |
| POST | `/api/vehicles/:id/unassign` | Unassign vehicle | Admin |
| GET | `/api/users/:userId/vehicles` | Get user's vehicles | Admin |

### User Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/my/profile` | Get current user profile | User/Admin |
| GET | `/api/my/vehicles` | Get current user's vehicles | User/Admin |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/health` | Server health check | Public |

## API Usage Examples

### 1. Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "phone": "+1234567890"
}
```

### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create Vehicle (Admin)
```bash
POST /api/vehicles
Authorization: Bearer <token>
Content-Type: application/json

{
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "licensePlate": "ABC-1234",
  "vin": "1HGBH41JXMN109186"
}
```

### 4. Assign Vehicle to User (Admin)
```bash
POST /api/vehicles/:vehicleId/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "60d5ec49f1b2c72b8c8e4f1a"
}
```

### 5. Get My Vehicles (User/Admin)
```bash
GET /api/my/vehicles
Authorization: Bearer <token>
```

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user']),
  phone: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Vehicle Model
```javascript
{
  make: String,
  model: String,
  year: Number,
  licensePlate: String (unique),
  vin: String (unique, optional),
  status: String (enum: ['available', 'assigned', 'maintenance']),
  assignedTo: ObjectId (ref: User),
  assignmentHistory: [{
    userId: ObjectId,
    assignedAt: Date,
    unassignedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **JWT Authentication** - Token-based authentication with expiry
2. **Password Hashing** - PBKDF2 with 100,000 iterations and SHA-512
3. **Rate Limiting** - 
   - General: 100 requests per 15 minutes
   - Auth: 5 attempts per 15 minutes
4. **Helmet.js** - Security headers
5. **Input Validation** - Joi schema validation
6. **CORS** - Configurable cross-origin resource sharing
7. **Role-Based Access Control** - Admin and User roles with proper authorization

## CORS Configuration

The API supports flexible CORS configuration through environment variables:

### Development Mode (Allow All)
```env
CORS_ORIGIN=*
CORS_CREDENTIALS=false
```

### Production Mode (Specific Origins)
```env
# Single origin
CORS_ORIGIN=https://yourdomain.com
CORS_CREDENTIALS=true

# Multiple origins (comma-separated)
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com,https://admin.yourdomain.com
CORS_CREDENTIALS=true
```

### Allowed Methods
- GET
- POST
- PUT
- DELETE
- PATCH

### Allowed Headers
- Content-Type
- Authorization

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## License

ISC

