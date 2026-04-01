# Library Management System - Backend

Node.js/Express backend with MongoDB for the Library Management System.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` File
Copy `.env.example` to `.env` and update the MongoDB URI:
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/library-management
NODE_ENV=development
PORT=5000
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
Install MongoDB Community Edition and start the service:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows: Start MongoDB Service from Services app
# or use mongod command in terminal
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string and update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ API endpoint: http://localhost:5000/api/library-state
```

## API Endpoints

### GET /api/library-state
Retrieves all library data (books, memberships, users, transactions)

**Response:**
```json
{
  "books": [...],
  "memberships": [...],
  "users": [...],
  "transactions": [...]
}
```

### PUT /api/library-state
Saves all library data to MongoDB

**Request Body:**
```json
{
  "books": [...],
  "memberships": [...],
  "users": [...],
  "transactions": [...]
}
```

## How It Works

1. **React Frontend** starts and loads data from GET `/api/library-state`
2. **Every change** (add book, issue transaction, etc.) triggers an auto-save to PUT `/api/library-state`
3. **MongoDB** persists all data
4. **On refresh**, frontend reloads fresh data from the database

## Troubleshooting

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` is correct
- For local MongoDB: `mongod` command in terminal

**"Port 5000 already in use"**
- Change PORT in `.env` to another value (e.g., 5001)
- Or kill the process using port 5000

**"Module not found" errors**
- Run `npm install` again
- Ensure you're in the `backend` directory

## Project Structure
```
backend/
├── server.js              # Main Express app
├── package.json
├── .env.example
├── config/
│   └── mongodb.js         # MongoDB connection
├── models/
│   └── library.model.js   # Mongoose schema
└── routes/
    └── library.routes.js  # API endpoints
```
