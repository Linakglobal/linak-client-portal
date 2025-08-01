-- Create the clients table in Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_clients_email ON clients(email);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some demo data (optional)
INSERT INTO clients (email, dob, name, company) VALUES 
('john.doe@example.com', '1985-06-15', 'John Doe', 'ACME Corporation'),
('jane.smith@company.com', '1990-03-22', 'Jane Smith', 'Tech Solutions Inc'),
('admin@linak.com', '1980-12-01', 'LINAK Admin', 'LINAK A/S'),
('test@demo.com', '1995-08-10', 'Demo User', 'Demo Company');

-- Set up Row Level Security (RLS) - optional but recommended
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows clients to only see their own data
CREATE POLICY "Users can only see their own data" ON clients
    FOR SELECT USING (auth.email() = email);

-- Policy for service role to access all data (for login verification)
CREATE POLICY "Service role can access all data" ON clients
    FOR ALL USING (auth.role() = 'service_role');
