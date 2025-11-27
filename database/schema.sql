-- Employee Task Tracker Database Schema
-- For Supabase PostgreSQL

-- Create Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Tasks table with foreign key to Employees
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT status_check CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    CONSTRAINT priority_check CHECK (priority IN ('low', 'medium', 'high'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_employee_id ON tasks(employee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional, for testing)
INSERT INTO employees (name, email, position, department) VALUES
    ('John Doe', 'john.doe@company.com', 'Software Engineer', 'Engineering'),
    ('Jane Smith', 'jane.smith@company.com', 'Product Manager', 'Product'),
    ('Bob Johnson', 'bob.johnson@company.com', 'Designer', 'Design'),
    ('Alice Williams', 'alice.williams@company.com', 'QA Engineer', 'Quality Assurance')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, employee_id, due_date) VALUES
    ('Implement user authentication', 'Add login and registration functionality', 'in_progress', 'high', 1, CURRENT_DATE + INTERVAL '7 days'),
    ('Design new dashboard UI', 'Create mockups for the dashboard page', 'pending', 'medium', 3, CURRENT_DATE + INTERVAL '5 days'),
    ('Write API documentation', 'Document all REST endpoints', 'completed', 'low', 1, CURRENT_DATE - INTERVAL '2 days'),
    ('Test payment integration', 'Verify payment gateway works correctly', 'pending', 'high', 4, CURRENT_DATE + INTERVAL '3 days'),
    ('Review code changes', 'Code review for PR #123', 'in_progress', 'medium', 2, CURRENT_DATE + INTERVAL '1 day')
ON CONFLICT DO NOTHING;

