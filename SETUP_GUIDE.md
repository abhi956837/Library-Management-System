# Library Management System - Quick Start Guide

## ✅ Backend (MongoDB) Setup Complete!

Your system is now ready to **store and retrieve data from MongoDB**.

## 🚀 Quick Start

### 1. Install MongoDB (Choose One)

#### Local MongoDB
- **macOS (Homebrew)**: `brew install mongodb-community`
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Linux**: Follow https://docs.mongodb.com/manual/installation/

#### MongoDB Atlas (Cloud - Recommended for Testing)
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

### 2. Start Backend Server

```bash
cd backend
npm install  # (already done)
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ API endpoint: http://localhost:5000/api/library-state
```

### 3. Start Frontend (in another terminal)

```bash
cd "Library Management System"
npm run dev
```

### 4. Test It!

1. Open http://localhost:5173 (or shown URL)
2. Login (e.g., username: admin)
3. Add/edit data
4. **Refresh page** → Data persists! ✓
5. Backend MongoDB has stored everything

---

## 📁 Project Structure

```
Library Management System/
├── Library Management System/        # React Frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                          # Express.js Backend
    ├── server.js                     (Main server)
    ├── config/mongodb.js             (DB connection)
    ├── models/library.model.js       (Mongoose schema)
    ├── routes/library.routes.js      (API endpoints)
    ├── .env                          (Config - Local MongoDB)
    ├── .env.example
    ├── package.json
    └── README.md
```

---

## 🔄 Data Flow

```
Frontend (React)
    ↓
    GET /api/library-state (on load)
    ↓
Backend (Express)
    ↓
MongoDB (stores everything)
    ↑
    PUT /api/library-state (on every change)
    ↑
Frontend (auto-save)
```

---

## ⚙️ Configuration

### Using Local MongoDB
1. Ensure MongoDB is running
2. Default `.env` is already set:
   ```
   MONGODB_URI=mongodb://localhost:27017/library-management
   ```

### Using MongoDB Atlas (Cloud)
1. Edit `backend/.env`
2. Update MONGODB_URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
   ```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to MongoDB" | Ensure `mongod` is running (local) or check Atlas connection string |
| "Port 5000 already in use" | Change `PORT=5001` in `backend/.env` |
| Frontend shows "Could not connect" | Make sure `npm run dev` is running in backend folder |
| Data not persisting | Check browser console for errors, verify MongoDB running |

---

## 📝 API Endpoints

### GET /api/library-state
Returns all data (books, memberships, users, transactions)

### PUT /api/library-state
Saves all data to MongoDB (called automatically by React)

---

## ✨ Features Enabled
✅ Add/Edit Books
✅ Add/Edit Memberships
✅ Issue/Return Books
✅ Fine Management
✅ User Management
✅ Reports
✅ **Data Persistence (MongoDB)**
✅ **Auto-save on every action**

---

## 🎯 Next Steps
1. Start MongoDB
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd "Library Management System" && npm run dev`
4. Test by adding data and refreshing
5. Check MongoDB to see stored documents

Enjoy! 🎉
