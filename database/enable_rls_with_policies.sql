-- Enable RLS with policies that allow full access for the postgres role
-- Use this if you want to keep RLS enabled but allow your backend to work

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for employees table
-- Allow all operations for the postgres role (your backend connection)
CREATE POLICY "Allow all for postgres role on employees"
ON employees
FOR ALL
TO postgres
USING (true)
WITH CHECK (true);

-- Create policies for tasks table
CREATE POLICY "Allow all for postgres role on tasks"
ON tasks
FOR ALL
TO postgres
USING (true)
WITH CHECK (true);

