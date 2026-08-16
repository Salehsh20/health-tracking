-- Demo login accounts
-- --------------------
-- These are the same hardcoded accounts the frontend accepts in demo mode
-- (see src/utils/demoData.js), so the credentials below work whether or not
-- the backend is running.
--
--   user@demo.com  / demo123   (role: user)
--   admin@demo.com / admin123  (role: admin)
--
-- Run this in phpMyAdmin AFTER database.sql and add-admin.sql.
-- The password hashes are real bcrypt hashes (10 rounds) and are verified
-- to match the plaintext passwords above.

USE healthtrack_db;

-- add-admin.sql normally creates this column; guard in case it was skipped.
-- If the column already exists MySQL raises "Duplicate column name 'role'" —
-- that error is safe to ignore.
ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password;

INSERT INTO users (username, email, password, role, full_name)
VALUES ('demo', 'user@demo.com', '$2b$10$gnasaDJrETyDtj3gF6skSewhzdnEhzrK8k6EqhLWTQyST0X1IEtHi', 'user', 'Demo User')
ON DUPLICATE KEY UPDATE
  password = VALUES(password),
  role = VALUES(role);

INSERT INTO users (username, email, password, role, full_name)
VALUES ('demoadmin', 'admin@demo.com', '$2b$10$P.WVh5kdSXVJdiLCqp2bHuzX6WXR2eagTr4dvczaStSosgAxVAUN.', 'admin', 'Demo Admin')
ON DUPLICATE KEY UPDATE
  password = VALUES(password),
  role = VALUES(role);

-- Fix the admin account from add-admin.sql: the hash committed there does not
-- actually match 'admin123'. This sets it to a hash that does.
UPDATE users
SET password = '$2b$10$P.WVh5kdSXVJdiLCqp2bHuzX6WXR2eagTr4dvczaStSosgAxVAUN.', role = 'admin'
WHERE email = 'admin@healthtrack.com';
