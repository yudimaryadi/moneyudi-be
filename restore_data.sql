-- Restore essential data only
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

-- Create users table (simplified)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#3B82F6',
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    amount DECIMAL NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    amount DECIMAL NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, month, year)
);

-- Insert user data (convert from Supabase auth.users)
INSERT INTO users (id, email, password, name, created_at, updated_at) VALUES
('46c2bd8f-2981-41c2-b1cf-b0da77534ba6', 'yudimaryadi039@gmail.com', '$2a$10$Cwk.vh/Dguwd1fE9v1j6cOzGjEjdIHRb3YNBaSSNLsRIeWGBMwCNi', 'Yudi Maryadi', '2024-12-28 10:46:03.533666+00', '2024-12-30 00:57:23.402043+00')
ON CONFLICT (id) DO NOTHING;