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