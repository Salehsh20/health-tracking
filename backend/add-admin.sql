-- Add role column to users table
ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password;

-- Create a default admin user (password: admin123)
-- Password hash for 'admin123'
INSERT INTO users (username, email, password, role, full_name) 
VALUES ('admin', 'admin@healthtrack.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Administrator')
ON DUPLICATE KEY UPDATE role='admin';
