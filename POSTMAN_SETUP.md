# Postman Setup Guide

This guide will help you set up and use the Postman collection for testing the Vehicle Management API.

## 📦 Files Included

1. `Vehicle-Management-API.postman_collection.json` - Complete API collection with all endpoints

## 🚀 Quick Setup

### Step 1: Import Collection

1. Open Postman
2. Click **Import** button (top left)
3. Drag and drop `Vehicle-Management-API.postman_collection.json` or click "Select Files"
4. Click **Import**

### Step 2: Verify Base URL

1. Click on the environment name in top-right
2. Verify `baseUrl` is set to `http://localhost:3000`
3. Change if your server runs on a different port

## 📋 Collection Structure

```
Vehicle Management API
├── Authentication
│   ├── Register Admin User
│   ├── Register Regular User
│   ├── Login Admin
│   └── Login User
├── User Management (Admin)
│   ├── Create User
│   ├── Get All Users
│   ├── Update User
│   └── Delete User
├── Vehicle Management (Admin)
│   ├── Create Vehicle
│   ├── Create Vehicle 2
│   ├── Get All Vehicles
│   ├── Get Vehicle by ID
│   ├── Update Vehicle
│   └── Delete Vehicle
├── Vehicle Assignment (Admin)
│   ├── Assign Vehicle to User
│   ├── Unassign Vehicle
│   └── Get User Vehicles (Admin)
├── User Endpoints
│   ├── Get My Profile (User)
│   ├── Get My Profile (Admin)
│   ├── Get My Vehicles (User)
│   └── Get My Vehicles (Admin)
├── Health Check
│   └── Health Check
└── Error Scenarios
    ├── Unauthorized - No Token
    ├── Forbidden - User Accessing Admin Route
    ├── Validation Error - Invalid Email
    ├── Validation Error - Short Password
    └── Not Found - Invalid Route
```

## 🔑 Environment Variables

The collection automatically manages these variables:

| Variable | Description | Auto-Set |
|----------|-------------|----------|
| `baseUrl` | API base URL | Manual |
| `admin_token` | Admin JWT token | Yes |
| `user_token` | User JWT token | Yes |
| `admin_id` | Admin user ID | Yes |
| `user_id` | Regular user ID | Yes |
| `vehicle_id` | Vehicle ID | Yes |

**Auto-Set**: These variables are automatically saved when you run the corresponding requests.

## 📝 Testing Flow

### Recommended Testing Sequence:

1. **Health Check** - Verify server is running
2. **Register Admin User** - Creates admin account (saves token automatically)
3. **Register Regular User** - Creates user account (saves token automatically)
4. **Create Vehicle** - Admin creates a vehicle (saves vehicle_id)
5. **Get All Vehicles** - View all vehicles
6. **Assign Vehicle to User** - Assign the vehicle to the user
7. **Get My Vehicles (User)** - User views their vehicles
8. **Unassign Vehicle** - Remove assignment
9. **Test other endpoints as needed**

### Quick Test Run:

```
1. Health Check
2. Register Admin User
3. Register Regular User
4. Create Vehicle
5. Assign Vehicle to User
6. Get My Vehicles (User)
```

## 🎯 Key Features

### 1. Automatic Token Management

When you register or login, the collection automatically:
- Extracts the JWT token from the response
- Saves it to the environment variable
- Uses it in subsequent requests

### 2. Dynamic Variables

The collection uses environment variables for:
- User IDs: `{{user_id}}`, `{{admin_id}}`
- Tokens: `{{admin_token}}`, `{{user_token}}`
- Vehicle ID: `{{vehicle_id}}`

### 3. Pre-configured Authorization

Each protected endpoint is already configured with Bearer token authentication using the appropriate environment variable.

## 🧪 Testing Different Scenarios

### Test as Admin:

Requests in these folders use `{{admin_token}}`:
- User Management (Admin)
- Vehicle Management (Admin)
- Vehicle Assignment (Admin)

### Test as Regular User:

Use these requests with `{{user_token}}`:
- Get My Profile (User)
- Get My Vehicles (User)

### Test Error Scenarios:

The **Error Scenarios** folder includes:
- Unauthorized access (no token)
- Forbidden access (wrong role)
- Validation errors
- Not found errors

### 4. Test Different Ports

If your server runs on a different port:
1. Click environment name in top-right
2. Edit `baseUrl` value
3. Example: `http://localhost:5000`

## 🔍 Common Issues

### Issue: "Error: getaddrinfo ENOTFOUND localhost"

**Solution**: Make sure your server is running:
```bash
npm run dev
```

### Issue: "401 Unauthorized"

**Solution**: 
1. Run "Login Admin" or "Login User" first
2. Check environment variables are set
3. Token might be expired (default: 7 days)

### Issue: "403 Forbidden"

**Solution**: 
- You're using user token on admin-only endpoint
- Switch to `{{admin_token}}` in Authorization

### Issue: Variables not auto-saving

**Solution**:
1. Make sure environment is selected (top-right)
2. Re-import the collection
3. Check Tests tab in the request

## 📊 Example Request Flow

### Complete User Journey:

```bash
# 1. Register as user
POST /api/auth/register
→ Saves: user_token, user_id

# 2. Admin assigns vehicle
POST /api/vehicles/:id/assign
→ Uses: admin_token, vehicle_id, user_id

# 3. User checks their vehicles
GET /api/my/vehicles
→ Uses: user_token
→ Shows: assigned vehicles
```

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [Environment Variables Guide](https://learning.postman.com/docs/sending-requests/variables/)
- [Writing Tests](https://learning.postman.com/docs/writing-scripts/test-scripts/)

## 🎉 Ready to Test!

1. ✅ Import collection
2. ✅ Select environment
3. ✅ Start server (`npm run dev`)
4. ✅ Click **Send** on "Health Check"
5. ✅ Start testing!

---


