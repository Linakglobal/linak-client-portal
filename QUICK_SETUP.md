## 🚀 Quick Supabase Setup for LINAK Client Portal

Your Supabase credentials are now configured! Here's what you need to do:

### 📋 **Step 1: Create the Database Table**

1. Go to your Supabase Dashboard: https://cybidftvobfzsrzrjjln.supabase.co
2. Navigate to **SQL Editor** (in the left sidebar)
3. Create a new query and paste this SQL:

```sql
-- Create the clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_clients_email ON clients(email);

-- Add demo data
INSERT INTO clients (email, dob, name, company) VALUES 
('admin@linak.com', '1980-12-01', 'LINAK Admin', 'LINAK A/S'),
('john.doe@example.com', '1985-06-15', 'John Doe', 'ACME Corporation'),
('jane.smith@company.com', '1990-03-22', 'Jane Smith', 'Tech Solutions Inc'),
('test@demo.com', '1995-08-10', 'Demo User', 'Demo Company');
```

4. Click **RUN** to execute the SQL

### 🔐 **Step 2: Configure Authentication**

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, set: `http://localhost:3100`
3. Under **Redirect URLs**, add: `http://localhost:3100/dashboard`

### 🧪 **Step 3: Test the Login**

Go to: http://localhost:3100/login

Use these demo credentials:

| Email | Date of Birth | Name |
|-------|---------------|------|
| admin@linak.com | 1980-12-01 | LINAK Admin |
| john.doe@example.com | 1985-06-15 | John Doe |
| jane.smith@company.com | 1990-03-22 | Jane Smith |
| test@demo.com | 1995-08-10 | Demo User |

### ✨ **How It Works**

1. **Enter Email & DOB**: The form validates the input
2. **Client Verification**: Checks if email exists in your `clients` table
3. **DOB Matching**: Verifies the date of birth matches the database
4. **Magic Link**: Sends authentication email via Supabase Auth
5. **Dashboard Access**: Redirects to the protected dashboard

### 🛠️ **If You Get Errors**

- **Table doesn't exist**: Run the SQL script above
- **Authentication errors**: Check your Auth settings in Supabase
- **Email not sending**: Check Supabase Auth logs

Your Supabase project is ready to go! 🎉
