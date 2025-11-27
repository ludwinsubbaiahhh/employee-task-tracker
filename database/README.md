# Database Setup

This folder contains the database schema and migration scripts for the Employee Task Tracker application.

## Database: Supabase PostgreSQL

## Setup Instructions

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon/public key

2. **Run the Schema**
   - Open the Supabase SQL Editor
   - Copy and paste the contents of `schema.sql`
   - Execute the script

3. **Get Connection Details**
   - In Supabase Dashboard, go to Settings > Database
   - Copy the connection string (you'll need this for the backend `.env` file)
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Schema Overview

### Tables

- **employees**: Stores employee information
  - id (Primary Key)
  - name
  - email (Unique)
  - position
  - department
  - created_at, updated_at

- **tasks**: Stores task information with relationship to employees
  - id (Primary Key)
  - title
  - description
  - status (pending, in_progress, completed, cancelled)
  - priority (low, medium, high)
  - employee_id (Foreign Key → employees.id)
  - due_date
  - created_at, updated_at

### Relationships

- One Employee can have many Tasks (One-to-Many)
- Tasks can optionally be assigned to an Employee

### Features

- Automatic `updated_at` timestamp updates via triggers
- Indexes on frequently queried columns
- Check constraints for status and priority values
- Sample data included for testing

