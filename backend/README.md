# HealthTrack Backend API

Backend server for HealthTrack application built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (via XAMPP)
- npm or yarn

## Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database or import the database.sql file:
   - Click on "Import" tab
   - Choose the `database.sql` file
   - Click "Go"

Alternatively, run these SQL commands:

```sql
CREATE DATABASE IF NOT EXISTS healthtrack_db;
USE healthtrack_db;

-- Then run all the CREATE TABLE statements from database.sql
```

## Installation

```bash
cd backend
npm install
```

## Configuration

The `.env` file contains database configuration:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=healthtrack_db
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

Update these values if your MySQL setup is different.

## Running the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Activities
- `GET /api/activities` - Get all activities (protected)
- `POST /api/activities` - Create activity (protected)
- `PUT /api/activities/:id` - Update activity (protected)
- `DELETE /api/activities/:id` - Delete activity (protected)

### Meals
- `GET /api/meals` - Get all meals (protected)
- `POST /api/meals` - Create meal (protected)
- `PUT /api/meals/:id` - Update meal (protected)
- `DELETE /api/meals/:id` - Delete meal (protected)

### Exercises
- `GET /api/exercises` - Get all exercises (protected)
- `POST /api/exercises` - Create exercise (protected)
- `PUT /api/exercises/:id` - Update exercise (protected)
- `DELETE /api/exercises/:id` - Delete exercise (protected)

## Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example signup request:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

## Database Schema

- **users** - User accounts
- **activities** - Daily activities (linked to users)
- **meals** - Meal tracking (linked to users)
- **exercises** - Exercise logging (linked to users)

All data tables have foreign key relationships with the users table for data integrity.
