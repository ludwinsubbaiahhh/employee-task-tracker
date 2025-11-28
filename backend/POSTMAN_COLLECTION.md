# Postman Collection for Employee Task Tracker API

## Import Instructions

1. Open Postman
2. Click "Import" button
3. Select "Raw text" tab
4. Copy and paste the JSON collection below
5. Click "Import"

## Environment Variables

Create a Postman environment with these variables:

- `base_url`: `http://localhost:5000/api`
- `token`: (will be set automatically after login)

## Collection JSON

```json
{
  "info": {
    "name": "Employee Task Tracker API",
    "description": "Complete API collection for Employee Task Tracker",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    var jsonData = pm.response.json();",
                  "    pm.environment.set('token', jsonData.token);",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"apiKey\": \"demo-key-123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            }
          }
        },
        {
          "name": "Verify Token",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/auth/verify",
              "host": ["{{base_url}}"],
              "path": ["auth", "verify"]
            }
          }
        }
      ]
    },
    {
      "name": "Employees",
      "item": [
        {
          "name": "Get All Employees",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/employees",
              "host": ["{{base_url}}"],
              "path": ["employees"]
            }
          }
        },
        {
          "name": "Get Employees with Tasks",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/employees/with-tasks",
              "host": ["{{base_url}}"],
              "path": ["employees", "with-tasks"]
            }
          }
        },
        {
          "name": "Get Employee by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/employees/1",
              "host": ["{{base_url}}"],
              "path": ["employees", "1"]
            }
          }
        },
        {
          "name": "Create Employee",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Employee\",\n  \"email\": \"test@example.com\",\n  \"position\": \"Developer\",\n  \"department\": \"Engineering\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/employees",
              "host": ["{{base_url}}"],
              "path": ["employees"]
            }
          }
        },
        {
          "name": "Update Employee",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Employee\",\n  \"email\": \"updated@example.com\",\n  \"position\": \"Senior Developer\",\n  \"department\": \"Engineering\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/employees/1",
              "host": ["{{base_url}}"],
              "path": ["employees", "1"]
            }
          }
        },
        {
          "name": "Delete Employee",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/employees/1",
              "host": ["{{base_url}}"],
              "path": ["employees", "1"]
            }
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/tasks",
              "host": ["{{base_url}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Get Tasks by Status",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/tasks?status=pending",
              "host": ["{{base_url}}"],
              "path": ["tasks"],
              "query": [
                {
                  "key": "status",
                  "value": "pending"
                }
              ]
            }
          }
        },
        {
          "name": "Get Tasks by Employee",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/tasks?employee_id=1",
              "host": ["{{base_url}}"],
              "path": ["tasks"],
              "query": [
                {
                  "key": "employee_id",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Get Task by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/tasks/1",
              "host": ["{{base_url}}"],
              "path": ["tasks", "1"]
            }
          }
        },
        {
          "name": "Get Dashboard Stats",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/tasks/stats",
              "host": ["{{base_url}}"],
              "path": ["tasks", "stats"]
            }
          }
        },
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"New Task\",\n  \"description\": \"Task description\",\n  \"status\": \"pending\",\n  \"priority\": \"medium\",\n  \"employee_id\": 1,\n  \"due_date\": \"2024-12-31\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/tasks",
              "host": ["{{base_url}}"],
              "path": ["tasks"]
            }
          }
        },
        {
          "name": "Update Task",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Task\",\n  \"description\": \"Updated description\",\n  \"status\": \"in_progress\",\n  \"priority\": \"high\",\n  \"employee_id\": 1,\n  \"due_date\": \"2024-12-31\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/tasks/1",
              "host": ["{{base_url}}"],
              "path": ["tasks", "1"]
            }
          }
        },
        {
          "name": "Delete Task",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/tasks/1",
              "host": ["{{base_url}}"],
              "path": ["tasks", "1"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

## Testing Workflow

1. **First, authenticate:**
   - Run "Login" request
   - Token will be automatically saved to environment

2. **Test public endpoints (no auth needed):**
   - Get All Employees
   - Get All Tasks
   - Get Dashboard Stats

3. **Test protected endpoints (auth required):**
   - Create Employee
   - Update Employee
   - Delete Employee
   - Create Task
   - Update Task
   - Delete Task

## Pre-request Scripts

The Login request includes a test script that automatically saves the token to the environment variable.

## Test Scripts

You can add test scripts to validate responses. Example:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});
```

