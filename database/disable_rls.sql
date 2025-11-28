-- Disable Row Level Security for development
-- This allows the backend to access the tables without RLS policies

ALTER TABLE employees DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;

