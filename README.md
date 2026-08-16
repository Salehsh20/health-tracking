# HealthTrack 🏥

A full-stack health tracking web application built with React, Node.js, Express, and MySQL.

## Project Description

HealthTrack is a comprehensive health and wellness tracking application that allows users to monitor their daily activities, meals, workouts, and view their progress over time. This is Phase 2 of the project, featuring a complete backend with user authentication and database integration.

## Features

### Phase 2 Features (Current)
- **User Authentication**: Secure signup/login with JWT tokens
- **Activities Tracking**: Log and manage daily activities
- **Meal Tracker**: Monitor meals with calorie counting
- **Exercise Logger**: Track workouts with duration and type
- **Progress Dashboard**: View weekly and all-time statistics
- **Secure API**: RESTful API with protected routes
- **Database Integration**: MySQL database with proper relationships

### Phase 1 Features
- Simple health tracking interface
- Local storage for data persistence
- Responsive design
- Clean and intuitive UI

## Technologies Used

### Frontend
- React 19
- Vite
- JavaScript (ES6+)
- CSS3 with modern styling

### Backend
- Node.js
- Express.js
- MySQL (via XAMPP)
- JWT Authentication
- bcryptjs for password hashing
- express-validator for input validation

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **XAMPP** - For MySQL database - [Download](https://www.apachefriends.org/)
- **Git** (optional) - For version control

## Installation & Setup

### 1. Clone or Download the Project

```bash
git clone https://github.com/yourusername/health-tracking.git
cd health-tracking
```

### 2. Database Setup

1. Start XAMPP and ensure **MySQL** is running
2. Open phpMyAdmin: http://localhost/phpmyadmin
3. Import the database:
   - Click on "Import" tab
   - Select `backend/database.sql`
   - Click "Go"

Alternatively, copy the SQL from `backend/database.sql` and execute it in phpMyAdmin.

### 3. Backend Setup

```bash
cd backend
npm install
```

Configure the database connection in `backend/.env` if needed (default settings work with XAMPP):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=healthtrack_db
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

Start the backend server:

```bash
npm start
```

The backend will run on http://localhost:5000

### 4. Frontend Setup

Open a new terminal in the project root:

```bash
npm install
npm run dev
```

The frontend will run on http://localhost:3000 (or 3001 if 3000 is busy)

## Demo Login (no backend required)

The app ships with two hardcoded demo accounts so you can browse every page
without XAMPP/MySQL or the Express server running:

| Role  | Email            | Password   |
|-------|------------------|------------|
| User  | `user@demo.com`  | `demo123`  |
| Admin | `admin@demo.com` | `admin123` |

Both are listed on the login screen — click one to fill the form, then press **Login**.

While logged in with a demo account:
- All API calls are served from an in-browser store (`localStorage`) instead of `http://localhost:5000`
- Activities, Meals and Exercises come pre-seeded with sample data, and adding/deleting works and persists across refreshes
- The admin account additionally unlocks the **Admin** tab with sample users and statistics

Implementation lives in `src/utils/demoData.js`; `src/utils/api.js` falls back to it
only when a demo account is signed in — any other account still goes to the real backend.

To reset the demo data back to its seeded state, clear the `demoData` key in
your browser's localStorage (DevTools → Application → Local Storage).

To use the same credentials against the **real** backend, import
`backend/demo-users.sql` in phpMyAdmin after `database.sql` and `add-admin.sql`.

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account
3. **Track Activities**: Add daily activities with descriptions
4. **Log Meals**: Record meals with calorie information
5. **Record Exercises**: Track workouts with duration and type
6. **View Progress**: Check your weekly and all-time statistics
7. **Logout**: Securely log out of your account

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

## Project Structure

```
health-tracking/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── activityController.js
│   │   ├── mealController.js
│   │   └── exerciseController.js
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── routes/
│   │   ├── auth.js
│   │   ├── activities.js
│   │   ├── meals.js
│   │   └── exercises.js
│   ├── database.sql             # Database schema
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env                     # Configuration
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Activities.jsx
│   │   ├── Meals.jsx
│   │   ├── Exercise.jsx
│   │   └── Progress.jsx
│   ├── utils/
│   │   ├── api.js               # API calls
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- full_name
- created_at
- updated_at

### Activities Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- description
- date
- created_at

### Meals Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- type (Breakfast/Lunch/Dinner/Snack)
- calories
- date
- created_at

### Exercises Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- name
- type (Cardio/Strength/Flexibility/Sports)
- duration
- date
- created_at

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Input validation with express-validator
- CORS enabled for cross-origin requests

## Troubleshooting

### Backend won't start
- Make sure MySQL is running in XAMPP
- Check that port 5000 is not in use
- Verify database credentials in `.env`

### Frontend won't start
- Run `npm install` in the root directory
- Check if another app is using port 3000
- Clear npm cache: `npm cache clean --force`

### Database connection failed
- Ensure XAMPP MySQL is started
- Verify database name exists: `healthtrack_db`
- Check MySQL is running on port 3306

### Login/Signup not working
- Check browser console for errors
- Verify backend is running on port 5000
- Check API URL in `src/utils/api.js`

## Future Enhancements

- Admin panel for user management
- Email notifications
- Mobile text message alerts
- Data export (PDF/Excel)
- Dark mode
- Charts and visualizations
- Mobile app version

## Course Information

**Course**: CSCI426 - Advanced Web Programming  
**Project**: Phase 2  
**Institution**: [University Name]

## Author

[Your Name]  
Student ID: [Your ID]

## License

This project is created for educational purposes.

---

**Note**: This application stores user data securely. Make sure to use strong passwords and keep your credentials safe!