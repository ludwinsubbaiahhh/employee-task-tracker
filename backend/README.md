# Backend API - Employee Task Tracker

Node.js + Express backend for the Employee Task Tracker application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `env.example`:
   ```bash
   cp env.example .env
   ```

3. Update `.env` with your Supabase database credentials

4. Start the server:
   ```bash
   npm start
   # Or for development:
   npm run dev
   ```

## API Endpoints

### Base URL
`http://localhost:5000/api`

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Tasks
- `GET /tasks` - Get all tasks (query params: `status`, `employee_id`)
- `GET /tasks/:id` - Get task by ID
- `GET /tasks/stats` - Get dashboard statistics
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Request/Response Examples

### Create Employee
```json
POST /api/employees
{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Developer",
  "department": "Engineering"
}
```

### Create Task
```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the project documentation",
  "status": "in_progress",
  "priority": "high",
  "employee_id": 1,
  "due_date": "2024-12-31"
}
```

### Filter Tasks
```
GET /api/tasks?status=completed&employee_id=1
```

## Error Handling

All errors return JSON in the format:
```json
{
  "error": "Error message"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

