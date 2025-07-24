# Appalo: Intelligent Workforce Management Platform 🚀

## 🌐 Project Overview

Appalo is a comprehensive Attendance Management System designed to streamline workforce tracking and management, with a modern, secure, and user-friendly interface.

### 🔑 Key Features

- 🔐 Secure Authentication
- 👥 Role-based Access Control
- 📊 Attendance Tracking
- 🖥️ Dashboard for Admin, Manager, and Employee
- 🎨 Responsive and Animated UI

## 🏗️ Project Structure

```
appalo/
│
├── frontend/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Dashboard/   # Dashboard-specific components
│   │   │   └── UI/          # Shared UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API and service layers
│   │   ├── styles/          # Global styles
│   │   ├── App.js           # Main React application
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/                 # Node.js/Express Backend
    ├── src/
    │   ├── controllers/     # Business logic
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── middleware/      # Authentication middleware
    │   ├── config/          # Configuration files
    │   └── utils/           # Utility functions
    ├── package.json
    └── .env                 # Environment variables
```

## 🔧 Frontend-Backend Connection Guide

### 1. Frontend API Service Configuration
```javascript
// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
};

export default api;
```

### 2. Backend Authentication Controller
```javascript
// backend/src/controllers/authController.js
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Validate credentials
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

### 3. Environment Variables
```bash
# Frontend .env
REACT_APP_API_URL=http://localhost:5000/api

# Backend .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/appalo
JWT_SECRET=your_secret_key
```

## 🚀 Setup and Installation

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/appalo.git

# Navigate to frontend directory
cd appalo/frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔒 Authentication Flow

1. User enters credentials on frontend
2. Frontend sends login request to backend
3. Backend validates credentials
4. Backend generates JWT token
5. Frontend stores token in localStorage
6. Token used for subsequent authenticated requests

## 👤 Roles and Permissions

- **Admin**: Full system access
- **Manager**: Team attendance management
- **Employee**: Personal attendance tracking

## 🛡️ Security Best Practices

- Use HTTPS
- Implement rate limiting
- Validate and sanitize all inputs
- Use strong password hashing (bcrypt)
- Implement JWT with short expiration
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
MIT License

---

**Happy Coding! 💻✨**

Developed with ❤️ by Appalo Team 