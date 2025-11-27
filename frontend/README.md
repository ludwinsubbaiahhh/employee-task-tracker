# Frontend - Employee Task Tracker

React frontend application for the Employee Task Tracker.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `env.example`:
   ```bash
   cp env.example .env
   ```

3. Update `.env` with your backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── EmployeeList.js
│   ├── TaskCard.js
│   ├── TaskList.js
│   └── TaskModal.js
├── pages/            # Page components
│   ├── Dashboard.js
│   └── Tasks.js
├── services/         # API service layer
│   └── api.js
├── App.js            # Main app component
├── App.css           # App styles
├── index.js          # Entry point
└── index.css         # Global styles
```

## Features

- **Dashboard**: View task statistics and completion rates
- **Tasks Page**: Manage tasks with filtering and CRUD operations
- **Employee Filtering**: Click employees to filter their tasks
- **Responsive Design**: Works on all screen sizes
- **Modal Forms**: Create and edit tasks with modal dialogs

