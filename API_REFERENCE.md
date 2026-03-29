# Zentask API Reference Guide

This document provides a comprehensive reference for all API endpoints available in the Zentask backend. This serves as a guide for frontend developers integrating with the backend services.

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication via JWT tokens. There are two types of tokens:
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to renew access tokens

### Authentication Headers
Include the access token in the Authorization header for protected endpoints:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register User
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user account
- **Authentication**: Not required

#### Request Body
```json
{
  "fullName": "string (2-50 characters)",
  "email": "string (valid email format)",
  "password": "string (min 6 characters)"
}
```

#### Response
```json
{
  "success": boolean,
  "message": "string",
  "user": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  },
  "accessToken": "string (JWT access token)",
  "refreshToken": "string (JWT refresh token)"
}
```

#### Error Responses
- `400`: Validation errors or user already exists
- `500`: Server configuration error

---

### Login User
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user and return tokens
- **Authentication**: Not required

#### Request Body
```json
{
  "email": "string (valid email format)",
  "password": "string (min 6 characters)"
}
```

#### Response
```json
{
  "success": boolean,
  "message": "string",
  "user": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  },
  "accessToken": "string (JWT access token)",
  "refreshToken": "string (JWT refresh token)"
}
```

#### Error Responses
- `400`: Email or password missing
- `401`: Invalid email or password
- `500`: Server configuration error

---

### Refresh Access Token
- **Endpoint**: `POST /auth/refresh-token`
- **Description**: Exchange refresh token for new access token
- **Authentication**: Not required (uses refresh token in request body)

#### Request Body
```json
{
  "refreshToken": "string (JWT refresh token)"
}
```

#### Response
```json
{
  "success": boolean,
  "accessToken": "string (new JWT access token)"
}
```

#### Error Responses
- `400`: Refresh token missing
- `401`: Invalid or expired refresh token
- `500`: Server error

---

### Logout User
- **Endpoint**: `POST /auth/logout`
- **Description**: Clear refresh token and log user out
- **Authentication**: Required (access token in header)

#### Response
```json
{
  "success": boolean,
  "message": "string"
}
```

#### Error Responses
- `401`: Invalid or expired access token
- `500`: Server error

---

### Get User Profile
- **Endpoint**: `GET /auth/profile`
- **Description**: Get current user's profile information
- **Authentication**: Required (access token in header)

#### Response
```json
{
  "success": boolean,
  "user": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```

#### Error Responses
- `401`: Invalid or expired access token
- `500`: Server error

---

### Update User Profile
- **Endpoint**: `PUT /auth/profile`
- **Description**: Update current user's profile information
- **Authentication**: Required (access token in header)

#### Request Body
```json
{
  "fullName": "string (optional, 2-50 characters)"
}
```

#### Response
```json
{
  "success": boolean,
  "message": "string",
  "user": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```

#### Error Responses
- `400`: Validation errors
- `401`: Invalid or expired access token
- `404`: User not found
- `500`: Server error

---

### Change Password
- **Endpoint**: `PUT /auth/change-password`
- **Description**: Change current user's password
- **Authentication**: Required (access token in header)

#### Request Body
```json
{
  "currentPassword": "string",
  "newPassword": "string (min 6 characters)"
}
```

#### Response
```json
{
  "success": boolean,
  "message": "string"
}
```

#### Error Responses
- `400`: Current password or new password missing
- `401`: Invalid current password
- `404`: User not found
- `500`: Server error

---

## Todo Endpoints

### Get All Todos
- **Endpoint**: `GET /todos`
- **Description**: Get all todos for the current user with optional filtering
- **Authentication**: Required (access token in header)

#### Query Parameters (optional)
- `category`: Filter by category (WORK, PERSONAL, HEALTH, FINANCE, OTHER)
- `priority`: Filter by priority (LOW, MEDIUM, HIGH, URGENT)
- `search`: Search in title or description

#### Response
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string (optional)",
    "completed": "boolean",
    "priority": "string (LOW, MEDIUM, HIGH, URGENT)",
    "category": "string (WORK, PERSONAL, HEALTH, FINANCE, OTHER)",
    "subTasks": [
      {
        "_id": "string",
        "title": "string",
        "completed": "boolean"
      }
    ],
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
]
```

#### Error Responses
- `401`: Invalid or expired access token
- `500`: Server error

---

### Create New Todo
- **Endpoint**: `POST /todos`
- **Description**: Create a new todo for the current user
- **Authentication**: Required (access token in header)

#### Request Body
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "string (optional, LOW, MEDIUM, HIGH, URGENT)",
  "category": "string (optional, WORK, PERSONAL, HEALTH, FINANCE, OTHER)",
  "subTasks": [
    {
      "title": "string",
      "completed": "boolean (default: false)"
    }
  ]
}
```

#### Response
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "priority": "string",
  "category": "string",
  "subTasks": [
    {
      "_id": "string",
      "title": "string",
      "completed": "boolean"
    }
  ],
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

#### Error Responses
- `400`: Title missing or validation errors
- `401`: Invalid or expired access token
- `500`: Server error

---

### Update Todo
- **Endpoint**: `PATCH /todos/:id`
- **Description**: Update a specific todo
- **Authentication**: Required (access token in header)

#### Path Parameter
- `id`: Todo ID to update

#### Request Body (partial updates allowed)
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "completed": "boolean (optional)",
  "priority": "string (optional, LOW, MEDIUM, HIGH, URGENT)",
  "category": "string (optional, WORK, PERSONAL, HEALTH, FINANCE, OTHER)",
  "subTasks": [
    {
      "_id": "string",
      "title": "string",
      "completed": "boolean"
    }
  ]
}
```

#### Response
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "priority": "string",
  "category": "string",
  "subTasks": [
    {
      "_id": "string",
      "title": "string",
      "completed": "boolean"
    }
  ],
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

#### Error Responses
- `400`: Validation errors
- `401`: Invalid or expired access token
- `404`: Todo not found
- `500`: Server error

---

### Delete Todo
- **Endpoint**: `DELETE /todos/:id`
- **Description**: Delete a specific todo
- **Authentication**: Required (access token in header)

#### Path Parameter
- `id`: Todo ID to delete

#### Response
```json
{
  "message": "Todo deleted successfully"
}
```

#### Error Responses
- `401`: Invalid or expired access token
- `404`: Todo not found
- `500`: Server error

---

## Health Endpoints

### Basic Health Check
- **Endpoint**: `GET /health`
- **Description**: Basic health status of the application
- **Authentication**: Not required

#### Response
```json
{
  "status": "healthy",
  "timestamp": "ISO date string",
  "uptime": "number (seconds)",
  "database": {
    "connected": "boolean",
    "status": "string"
  },
  "memory": {
    "rss": "string",
    "heapTotal": "string",
    "heapUsed": "string"
  },
  "version": "string"
}
```

---

### Detailed Health Check
- **Endpoint**: `GET /health/details`
- **Description**: Detailed health status of the application
- **Authentication**: Not required

#### Response
```json
{
  "status": "healthy",
  "timestamp": "ISO date string",
  "uptime": "number (seconds)",
  "database": {
    "connected": "boolean",
    "status": "string"
  },
  "memory": {
    "rss": "string",
    "heapTotal": "string",
    "heapUsed": "string"
  },
  "version": "string",
  "os": {
    "platform": "string",
    "arch": "string",
    "release": "string",
    "uptime": "number (seconds)"
  },
  "process": {
    "pid": "number",
    "memoryUsage": "object",
    "uptime": "number (seconds)"
  }
}
```

---

## Error Response Format

All error responses follow this general format:

```json
{
  "success": false,
  "message": "string (descriptive error message)"
}
```

## Notes for Frontend Development

1. **Token Management**: Store access tokens in memory and refresh tokens in secure storage (localStorage/cookies)
2. **Token Expiration**: Handle 401 responses by attempting to refresh the access token
3. **Loading States**: Show loading indicators when making API requests
4. **Error Handling**: Display user-friendly error messages based on API responses
5. **Validation**: Perform client-side validation before sending requests to improve UX
6. **Rate Limiting**: Implement appropriate delays between requests to avoid rate limiting