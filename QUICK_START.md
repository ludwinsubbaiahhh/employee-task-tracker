# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Database Setup (2 minutes)
1. Go to [supabase.com](https://supabase.com) and create a project
2. Open SQL Editor in Supabase Dashboard
3. Copy and paste contents of `database/schema.sql`
4. Run the SQL script
5. Copy your database connection details from Settings → Database

### 2. Backend Setup (1 minute)
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your Supabase credentials
npm start
```

### 3. Frontend Setup (1 minute)
```bash
cd frontend
npm install
cp env.example .env
# Edit .env if backend is not on localhost:5000
npm start
```

### 4. Access Application (1 minute)
- Open browser: `http://localhost:3000`
- You're ready to go! 🎉

## 📋 Environment Variables

### Backend (.env)
```env
DB_HOST=db.YOUR_PROJECT_REF.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD
DB_SSL=true
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ✅ Verify Setup

1. Backend should show: "Server is running on port 5000"
2. Frontend should open automatically in browser
3. Dashboard should show statistics
4. Tasks page should show sample tasks

## 🐛 Troubleshooting

**Backend won't start:**
- Check database credentials in `.env`
- Ensure Supabase project is active
- Check if port 5000 is available

**Frontend can't connect:**
- Verify backend is running
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for errors

**Database errors:**
- Ensure schema.sql was run successfully
- Check Supabase project status
- Verify connection string format

