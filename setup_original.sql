-- Insert user
INSERT INTO users (id, email, password, name, "createdAt", "updatedAt") VALUES
('46c2bd8f-2981-41c2-b1cf-b0da77534ba6', 'yudimaryadi039@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.fDkkxphD.E0WJvQejkyd2Ze1xzjYou', 'Yudi Maryadi', NOW(), NOW());

-- Insert user settings
INSERT INTO user_settings (id, "userId", "monthlyCutoffDay") VALUES
('settings-1', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6', 1);

-- Insert categories with expense/income types
INSERT INTO categories (id, name, icon, "typeScope", "userId") VALUES
('cat-1', '🍔 Makanan', '🍔', 'expense', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-2', '🚗 Transport', '🚗', 'expense', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-3', '🛒 Belanja', '🛒', 'expense', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-4', '🎮 Hiburan', '🎮', 'expense', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-5', '💰 Gaji', '💰', 'income', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-6', '💼 Freelance', '💼', 'income', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6'),
('cat-7', '☕ Kopi', '☕', 'both', '46c2bd8f-2981-41c2-b1cf-b0da77534ba6');