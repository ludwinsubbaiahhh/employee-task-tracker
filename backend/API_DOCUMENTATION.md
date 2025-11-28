# Employee Task Tracker API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Overview
The API uses JWT (JSON Web Token) authentication for protected endpoints. Public endpoints (GET requests) don't require authentication, while write operations (POST, PUT, DELETE) require a valid JWT token.

### Getting a Token

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "apiKey": "demo-key-123"
}
```

**Response:**
```json
{
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Demo User"
  },
  "expiresIn": "24h"
}
```

**Available API Keys (for testing):**
- `demo-key-123` - Demo User
- `admin-key-456` - Admin User

### Using the Token

Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

### Verify Token

**Endpoint:** `GET /api/auth/verify`

**Headers:**
```
Authorization: Bearer <your-token>
```

**Response:**
```json
{
  "message": "Token is valid",
  "user": {
    "userId": 1
  }
}
```

---

## Employees API

### Get All Employees
**Endpoint:** `GET /api/employees`  
**Authentication:** Not required (Public)

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "position": "Software Engineer",
    "department": "Engineering",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Employees with Tasks
**Endpoint:** `GET /api/employees/with-tasks`  
**Authentication:** Not required (Public)

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "position": "Software Engineer",
    "department": "Engineering",
    "tasks": [
      {
        "id": 1,
        "title": "Implement user authentication",
        "description": "Add login and registration functionality",
        "status": "in_progress",
        "priority": "high",
        "employee_id": 1,
        "due_date": "2024-12-31"
      }
    ],
    "task_count": 1
  }
]
```

### Get Employee by ID
**Endpoint:** `GET /api/employees/:id`  
**Authentication:** Not required (Public)

**Parameters:**
- `id` (integer) - Employee ID

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer",
  "department": "Engineering",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400` - Invalid ID format
- `404` - Employee not found

### Create Employee
**Endpoint:** `POST /api/employees`  
**Authentication:** Required (Protected)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@company.com",
  "position": "Product Manager",
  "department": "Product"
}
```

**Validation Rules:**
- `name` (required): String, 2-255 characters
- `email` (required): Valid email format, max 255 characters
- `position` (optional): String, max 255 characters
- `department` (optional): String, max 255 characters

**Response:**
```json
{
  "message": "Employee created successfully",
  "employee": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "position": "Product Manager",
    "department": "Product",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation failed
- `401` - Authentication required
- `400` - Email already exists

### Update Employee
**Endpoint:** `PUT /api/employees/:id`  
**Authentication:** Required (Protected)

**Parameters:**
- `id` (integer) - Employee ID

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "email": "jane.smith@company.com",
  "position": "Senior Product Manager",
  "department": "Product"
}
```

**Response:**
```json
{
  "message": "Employee updated successfully",
  "employee": {
    "id": 2,
    "name": "Jane Smith Updated",
    "email": "jane.smith@company.com",
    "position": "Senior Product Manager",
    "department": "Product",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation failed or invalid ID
- `401` - Authentication required
- `404` - Employee not found
- `400` - Email already exists

### Delete Employee
**Endpoint:** `DELETE /api/employees/:id`  
**Authentication:** Required (Protected)

**Parameters:**
- `id` (integer) - Employee ID

**Response:**
```json
{
  "message": "Employee deleted successfully",
  "employee": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@company.com"
  }
}
```

**Error Responses:**
- `400` - Invalid ID format
- `401` - Authentication required
- `404` - Employee not found

---

## Tasks API

### Get All Tasks
**Endpoint:** `GET /api/tasks`  
**Authentication:** Not required (Public)

**Query Parameters:**
- `status` (optional) - Filter by status: `pending`, `in_progress`, `completed`, `cancelled`
- `employee_id` (optional) - Filter by employee ID

**Example:**
```
GET /api/tasks?status=pending&employee_id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Implement user authentication",
    "description": "Add login and registration functionality",
    "status": "in_progress",
    "priority": "high",
    "employee_id": 1,
    "employee_name": "John Doe",
    "employee_email": "john.doe@company.com",
    "due_date": "2024-12-31",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Task by ID
**Endpoint:** `GET /api/tasks/:id`  
**Authentication:** Not required (Public)

**Parameters:**
- `id` (integer) - Task ID

**Response:**
```json
{
  "id": 1,
  "title": "Implement user authentication",
  "description": "Add login and registration functionality",
  "status": "in_progress",
  "priority": "high",
  "employee_id": 1,
  "employee_name": "John Doe",
  "employee_email": "john.doe@company.com",
  "due_date": "2024-12-31",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Get Dashboard Statistics
**Endpoint:** `GET /api/tasks/stats`  
**Authentication:** Not required (Public)

**Response:**
```json
{
  "total_tasks": "10",
  "completed_tasks": "3",
  "pending_tasks": "4",
  "in_progress_tasks": "2",
  "cancelled_tasks": "1",
  "completion_rate": "30.00"
}
```

### Create Task
**Endpoint:** `POST /api/tasks`  
**Authentication:** Required (Protected)

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "employee_id": 1,
  "due_date": "2024-12-31"
}
```

**Validation Rules:**
- `title` (required): String, 3-255 characters
- `description` (optional): String
- `status` (optional): One of: `pending`, `in_progress`, `completed`, `cancelled` (default: `pending`)
- `priority` (optional): One of: `low`, `medium`, `high` (default: `medium`)
- `employee_id` (optional): Positive integer
- `due_date` (optional): Valid date in YYYY-MM-DD format

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 11,
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "employee_id": 1,
    "due_date": "2024-12-31",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation failed
- `401` - Authentication required

### Update Task
**Endpoint:** `PUT /api/tasks/:id`  
**Authentication:** Required (Protected)

**Parameters:**
- `id` (integer) - Task ID

**Request Body:** (same as Create Task)

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 11,
    "title": "Updated Task",
    "status": "in_progress",
    ...
  }
}
```

**Error Responses:**
- `400` - Validation failed or invalid ID
- `401` - Authentication required
- `404` - Task not found

### Delete Task
**Endpoint:** `DELETE /api/tasks/:id`  
**Authentication:** Required (Protected)

**Parameters:**
- `id` (integer) - Task ID

**Response:**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 11,
    "title": "Task Title",
    ...
  }
}
```

**Error Responses:**
- `400` - Invalid ID format
- `401` - Authentication required
- `404` - Task not found

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": ["Additional error details"] // Optional, for validation errors
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (database connection issues)

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing rate limiting to prevent abuse.

---

## CORS

The API is configured to accept requests from:
- Development: `http://localhost:3000`
- Production: Set via `FRONTEND_URL` environment variable

---

## Database Schema

### Employees Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `email` (VARCHAR(255) UNIQUE NOT NULL)
- `position` (VARCHAR(255))
- `department` (VARCHAR(255))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tasks Table
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `status` (VARCHAR(50) NOT NULL DEFAULT 'pending')
- `priority` (VARCHAR(50) DEFAULT 'medium')
- `employee_id` (INTEGER REFERENCES employees(id) ON DELETE SET NULL)
- `due_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## Testing

See `POSTMAN_COLLECTION.md` for Postman collection import instructions.

---

## Support

For issues or questions, please refer to the project README or create an issue in the repository.

