-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table  
CREATE TABLE categories (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#3B82F6',
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    amount DECIMAL NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "categoryId" TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE budgets (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    amount DECIMAL NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("userId", month, year)
);

-- Insert user data
INSERT INTO users (id, email, password, name, "createdAt", "updatedAt") VALUES
('46c2bd8f-2981-41c2-b1cf-b0da77534ba6', 'yudimaryadi039@gmail.com', '$2a$10$Cwk.vh/Dguwd1fE9v1j6cOzGjEjdIHRb3YNBaSSNLsRIeWGBMwCNi', 'Yudi Maryadi', '2024-12-28 10:46:03.533666+00', '2024-12-30 00:57:23.402043+00');

-- Insert sample categories
INSERT INTO categories (name, color, "userId") VALUES
('Makanan', '#FF6B6B', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('Transport', '#4ECDC4', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('Belanja', '#45B7D1', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('Hiburan', '#96CEB4', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6');

-- Insert sample transactions
INSERT INTO transactions (amount, description, date, "userId", "categoryId") VALUES
(25000, 'Makan siang di warung', '2024-12-29 12:30:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Makanan' LIMIT 1)),
(15000, 'Ojek online', '2024-12-29 08:15:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Transport' LIMIT 1)),
(50000, 'Belanja bulanan', '2024-12-28 16:45:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Belanja' LIMIT 1)),
(35000, 'Nonton bioskop', '2024-12-27 19:20:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Hiburan' LIMIT 1)),
(12000, 'Kopi pagi', '2024-12-30 07:30:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Makanan' LIMIT 1)),
(20000, 'Bensin motor', '2024-12-29 18:00:00+00', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', (SELECT id FROM categories WHERE name = 'Transport' LIMIT 1));

-- Insert sample budget
INSERT INTO budgets (amount, month, year, "userId") VALUES
(1000000, 12, 2024, '46c2bd8f-2981-41c2-b1cf-b0da77534ba6');