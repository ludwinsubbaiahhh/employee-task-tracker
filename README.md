# Employee Task Tracker

A full-stack web application for managing employees and their tasks within a company. Built with React frontend, Node.js/Express backend, and Supabase PostgreSQL database.

## 🚀 Features

- **Employee Management**: View, add, update, and manage employees
- **Task Management**: Create, update, delete, and track tasks
- **Task Assignment**: Assign tasks to employees
- **Filtering**: Filter tasks by status or employee
- **Dashboard**: View summary statistics including total tasks, completion rate, and status breakdown
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: All changes are persisted in the database

## 📋 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **pg (node-postgres)** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **Supabase PostgreSQL** - Cloud-hosted PostgreSQL database

## 📁 Project Structure

```
employee-task-tracker/
├── frontend/              # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── env.example
├── backend/               # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   ├── package.json
│   └── env.example
├── database/              # Database schema and migrations
│   ├── schema.sql         # Database schema
│   └── README.md
└── README.md              # This file
```
## 📸 Screenshots

   ### Dashboard
   ![Dashboard](https://github.com/ludwinsubbaiahhh/employee-task-tracker/blob/main/screenshots/dashboard.png?raw=true)



## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Supabase account (free tier works)

### Step 1: Database Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Create a new project
   - Wait for the project to be provisioned

2. **Run the Database Schema**
   - In Supabase Dashboard, navigate to SQL Editor
   - Open the file `database/schema.sql`
   - Copy and paste the entire content into the SQL Editor
   - Click "Run" to execute the schema
   - This will create the `employees` and `tasks` tables with sample data

3. **Get Database Connection Details**
   - In Supabase Dashboard, go to **Settings** → **Database**
   - Find the connection string under "Connection string"
   - You'll need:
     - Host: `db.[YOUR_PROJECT_REF].supabase.co`
     - Port: `5432`
     - Database: `postgres`
     - User: `postgres`
     - Password: (Your database password)

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `env.example` to `.env`
   - Update the database connection details:
   ```env
   DB_HOST=db.YOUR_PROJECT_REF.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=YOUR_PASSWORD
   DB_SSL=true
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the backend server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

   The backend should now be running on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `env.example` to `.env`
   - Update the API URL if needed:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`

### Step 4: Access the Application

- Open your browser and navigate to `http://localhost:3000`
- You should see the Employee Task Tracker application

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` - Login with API key to get JWT token
- `GET /api/auth/verify` - Verify JWT token (protected)

**Note:** Protected endpoints (POST, PUT, DELETE) require JWT authentication. See `backend/API_DOCUMENTATION.md` for details.

### Employees

- `GET /api/employees` - Get all employees (Public)
- `GET /api/employees/with-tasks` - Get employees with their assigned tasks (Public)
- `GET /api/employees/:id` - Get employee by ID (Public)
- `POST /api/employees` - Create a new employee (Protected)
- `PUT /api/employees/:id` - Update an employee (Protected)
- `DELETE /api/employees/:id` - Delete an employee (Protected)

### Tasks

- `GET /api/tasks` - Get all tasks (Public, supports query params: `?status=pending&employee_id=1`)
- `GET /api/tasks/:id` - Get task by ID (Public)
- `GET /api/tasks/stats` - Get dashboard statistics (Public)
- `POST /api/tasks` - Create a new task (Protected)
- `PUT /api/tasks/:id` - Update a task (Protected)
- `DELETE /api/tasks/:id` - Delete a task (Protected)

## 🎨 Features Overview

### Dashboard
- Displays total tasks count
- Shows completed, in-progress, pending, and cancelled tasks
- Calculates and displays completion rate percentage
- Beautiful card-based layout with color-coded statistics

### Tasks Page
- View all tasks in a grid layout
- Filter tasks by status (pending, in_progress, completed, cancelled)
- Filter tasks by employee (click on employee in sidebar)
- Create new tasks with modal form
- Edit existing tasks
- Delete tasks with confirmation
- Each task card shows:
  - Title and description
  - Status badge (color-coded)
  - Priority badge (low, medium, high)
  - Assigned employee
  - Due date

### Employee Management
- View all employees in sidebar with assigned tasks
- Create new employees with full details
- Edit existing employee information
- Delete employees (with confirmation)
- Click on employee to filter their tasks
- Expand employee cards to see all assigned tasks
- Employees are displayed with name, email, position, and department
- Task count and completion status for each employee

## 🗄️ Database Schema

### Employees Table
- `id` (Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `position` (VARCHAR)
- `department` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tasks Table
- `id` (Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `status` (VARCHAR: pending, in_progress, completed, cancelled)
- `priority` (VARCHAR: low, medium, high)
- `employee_id` (Foreign Key → employees.id)
- `due_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Relationships
- One Employee can have many Tasks (One-to-Many)
- Tasks can optionally be assigned to an Employee

## 🎯 Best Practices Implemented

### Frontend
- ✅ Component-based architecture
- ✅ Separation of concerns (components, pages, services)
- ✅ Environment variables for configuration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean, intuitive UI/UX with modern design
- ✅ Error handling and loading states
- ✅ RESTful API integration
- ✅ JWT authentication integration
- ✅ Form validation and user feedback
- ✅ Smooth animations and transitions

### Backend
- ✅ RESTful API design with logical endpoints
- ✅ MVC architecture (Models, Views/Controllers, Routes)
- ✅ Comprehensive input validation middleware
- ✅ Error handling middleware with detailed messages
- ✅ Environment variables for configuration
- ✅ CORS configuration
- ✅ Database connection pooling with proper settings
- ✅ JWT authentication (Bonus Challenge)
- ✅ Protected routes for write operations
- ✅ Public read endpoints
- ✅ Consistent error response format
- ✅ Code comments and documentation

### Database
- ✅ Proper relationships with foreign keys
- ✅ Indexes for performance
- ✅ Check constraints for data integrity
- ✅ Automatic timestamp updates via triggers
- ✅ Sample data for testing
- ✅ Normalized schema design

### API Design
- ✅ Clean, logical RESTful endpoints
- ✅ Proper HTTP status codes
- ✅ Consistent response formats
- ✅ Comprehensive validation
- ✅ Detailed API documentation
- ✅ Postman collection for testing

## 🧪 Testing the Application

1. **View Dashboard**: Click on "Dashboard" tab to see statistics
2. **View Tasks**: Click on "Tasks" tab to see all tasks
3. **Filter by Status**: Use the dropdown to filter tasks by status
4. **Filter by Employee**: Click on an employee in the sidebar
5. **Create Task**: Click "Add Task" button and fill in the form
6. **Edit Task**: Click "Edit" on any task card
7. **Delete Task**: Click "Delete" on any task card (with confirmation)
8. **Clear Filters**: Click "Clear Filters" button

## 📝 Assumptions & Design Decisions

### Assumptions
- Employees can have multiple tasks assigned
- Tasks can be unassigned (no employee)
- Task statuses: pending, in_progress, completed, cancelled
- Task priorities: low, medium, high
- Due dates are optional
- Email addresses must be unique for employees
- Authentication required for create/update/delete operations
- Public read access for viewing data

### Bonus Features Implemented
- ✅ **JWT Authentication**: Secure API endpoints with token-based authentication
- ✅ **Input Validation**: Comprehensive validation middleware using express-validator
- ✅ **API Documentation**: Complete API documentation with examples
- ✅ **Postman Collection**: Ready-to-use Postman collection for API testing
- ✅ **Enhanced UI/UX**: Modern, responsive design with smooth animations
- ✅ **Employee CRUD Operations**: Full create, read, update, delete for employees
- ✅ **Task Assignment Display**: Visual representation of tasks assigned to employees
- ✅ **Dashboard Statistics**: Real-time statistics with completion rate calculation
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Database Connection Pooling**: Optimized database connections with proper pooling
- ✅ **React Portals**: Modals rendered using React portals for proper z-index stacking

## 🔐 Authentication

The API uses JWT (JSON Web Token) authentication for protected endpoints.

### Getting Started with Authentication

1. **Login to get a token:**
   ```bash
   POST /api/auth/login
   Body: { "apiKey": "demo-key-123" }
   ```

2. **Use the token in requests:**
   ```
   Authorization: Bearer <your-token>
   ```

3. **Available API Keys (for testing):**
   - `demo-key-123` - Demo User
   - `admin-key-456` - Admin User

**Note:** The frontend automatically handles authentication for you. For API testing, see `backend/API_DOCUMENTATION.md` and `backend/POSTMAN_COLLECTION.md`.

## 📚 Documentation

- **API Documentation:** See `backend/API_DOCUMENTATION.md` for complete API reference
- **Postman Collection:** See `backend/POSTMAN_COLLECTION.md` for testing instructions
- **Database Schema:** See `database/schema.sql` and `database/README.md`

## 🚀 Deployment Considerations

### Backend
- Set `NODE_ENV=production` in production
- Use environment variables for all sensitive data
- Consider using a process manager like PM2
- Set up proper CORS for your production frontend URL

### Frontend
- Build the production version: `npm run build`
- Serve the `build` folder using a static file server
- Update `REACT_APP_API_URL` to point to your production backend

### Database
- Supabase handles backups and scaling automatically
- Consider setting up connection pooling for high traffic


## 🤝 Contributing

This is a project assignment. Feel free to extend it with:
- User authentication
- Role-based access control
- Task comments
- File attachments
- Email notifications
- Advanced filtering and search
- Task dependencies
- Time tracking

## 📄 License

This project is created for educational/assignment purposes.

## 👤 Author

Created as part of a full-stack development assignment.

---

**Happy Coding! 🎉**

