# 📚 Library Management System

A simple, elegant, and user-friendly application to manage your library like a pro! Whether you're running a small community library or a large institutional one, this system helps you organize books, manage members, track borrowed items, and handle fines—all in one place.

---

## 🎯 What This Project Does

Imagine a notebook that keeps track of:
- 📖 **All your books** → Who has which book and when it's due back
- 👥 **Your members** → Active members, their details, and membership plans
- 📅 **Transactions** → Issue books, return them, calculate late fees (₹10/day)
- 📊 **Reports** → See what's borrowed, what's overdue, and more

Now imagine that notebook is powered by modern technology! That's what this system does. ✨

---

## ✨ Key Features

### 📖 **Book Management**
- Add books and movies to your library
- Track which books are available and which are borrowed
- Assign serial numbers and categories for easy searching

### 👤 **Member Management**
- Register new members with flexible plans (6 months, 1 year, 2 years)
- Update membership details anytime
- Extend or cancel memberships easily

### 📤 **Book Transactions**
- Issue books to members with automatic 15-day return dates
- Search for available books by title or category
- Return books and calculate fines automatically

### 💰 **Fine Management**
- Automatic late fee calculation (₹10 per day)
- Track pending fines and mark them as paid
- No book returns until fine is settled

### 📊 **Reports & Analytics**
- View all active issues and returns
- Track overdue books and pending fines
- See complete transaction history

### 🔒 **Role-Based Access**
- **Admin**: Full access to everything (books, members, users, reports)
- **User**: Can only access transactions and reports (no admin features)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI component library — builds the interactive single-page application |
| [Vite](https://vite.dev/) | 8 | Lightning-fast dev server and build tool (replaces Create React App) |
| `@vitejs/plugin-react` | 6 | Vite plugin that enables JSX transforms and React Fast Refresh |
| CSS Modules / Vanilla CSS | — | Scoped component styles and global theme (no CSS framework needed) |
| [ESLint](https://eslint.org/) | 9 | Static code linting with React-specific rules (`react-hooks`, `react-refresh`) |
| [concurrently](https://github.com/open-cli-tools/concurrently) | 9 | Runs the frontend dev server and backend server in one terminal |
| [nodemon](https://nodemon.io/) | 3 | Auto-restarts the bundled Express server on file changes during development |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥ 18 (LTS) | JavaScript runtime that powers the backend API server |
| [Express](https://expressjs.com/) | 4 / 5 | Minimal web framework — handles HTTP routing and middleware |
| [Mongoose](https://mongoosejs.com/) | 8 | ODM (Object Data Modeling) library for MongoDB; defines schemas & runs queries |
| [cors](https://github.com/expressjs/cors) | 2 | Allows the React frontend (port 5173) to call the API server (port 5000) |
| [dotenv](https://github.com/motdotla/dotenv) | 16 / 17 | Loads environment variables from a `.env` file (e.g. `MONGODB_URI`, `PORT`) |
| [nodemon](https://nodemon.io/) | 3 | Auto-restarts the backend server on source-file changes |

### Database
| Technology | Version | Purpose |
|---|---|---|
| [MongoDB](https://www.mongodb.com/) | 6 + | NoSQL document database — stores books, members, users, and transactions |
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Cloud | Optional hosted MongoDB (free tier available) for cloud deployment |

### Language
| Technology | Notes |
|---|---|
| JavaScript (ES Modules) | Both frontend and backend use `"type": "module"` — modern `import`/`export` syntax throughout |
| JSX | React component templating syntax, transpiled by Vite/Babel |

---

## 🚀 Quick Start (3 Minutes)

### Prerequisites
- Node.js installed
- MongoDB running (local or cloud)

### 1️⃣ **Setup Backend**

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

### 2️⃣ **Setup Frontend** (in another terminal)

```bash
cd "Library Management System"
npm install
npm run dev
```

Open: `http://localhost:5173`

### 3️⃣ **Login & Explore**

**Admin Account:**
- Username: `admin`
- Password: `admin`
- Access: Everything! 🎉

**User Account:**
- Username: `user`
- Password: `user`
- Access: Transactions & Reports only

---

## 📁 Project Structure

```
Library Management System/
│
├── 📂 Library Management System/      # React Frontend
│   ├── src/
│   │   ├── pages/                    # All pages (Login, Dashboard, etc.)
│   │   ├── components/               # Reusable components
│   │   ├── utils/                    # Helper functions
│   │   ├── data/                     # Mock data & navigation
│   │   └── App.jsx                   # Main app
│   ├── package.json
│   └── vite.config.js
│
├── 📂 backend/                       # Node.js Backend
│   ├── server.js                     # Express server
│   ├── config/                       # MongoDB connection
│   ├── models/                       # Data models
│   ├── routes/                       # API endpoints
│   ├── package.json
│   └── .env                          # Configuration
│
└── 📄 Documentation Files
    ├── README.md                     # This file
    ├── SETUP_GUIDE.md               # Detailed setup
    ├── GITHUB_UPLOAD_GUIDE.md       # How to deploy on GitHub
    └── FINAL_REQUIREMENTS_COMPLIANCE.md  # Requirements checklist
```

---

## 📖 How to Use It

### As an Admin

1. **Login** with `admin/admin`
2. **Dashboard** → See library stats at a glance
3. **Add Members** → Register new library members
4. **Add Books** → Add books/movies to inventory
5. **Manage Users** → Create system users with different roles
6. **View Reports** → See all transactions and analytics

### As a Regular User

1. **Login** with `user/user`
2. **Dashboard** → Quick overview
3. **Check Availability** → Search for books
4. **Issue Books** → Borrow books (15-day limit)
5. **Return Books** → Automatic fine calculation
6. **Pay Fines** → Settle any pending charges
7. **View Reports** → See your transaction history

---

## ✅ Features Checklist

- ✅ User authentication with roles
- ✅ Book/Movie inventory management
- ✅ Member registration & management
- ✅ Books issue & return process
- ✅ Automatic fine calculation (₹10/day late)
- ✅ Find management
- ✅ Transaction history & reports
- ✅ Role-based access control
- ✅ MongoDB data persistence
- ✅ Responsive UI design
- ✅ Form validation on all inputs
- ✅ Error messages on same page

---

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
# Start MongoDB Service from Services app
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
   ```

---

## 📝 Environment Variables

Create `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/library-management
NODE_ENV=development
PORT=5000
```

---

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check MongoDB URI in `.env` file

**"Port 5000 already in use"**
- Change PORT in `.env` to 5001 or stop the conflicting process

**"Module not found" errors**
- Run `npm install` in the problematic directory
- Ensure you're in the correct folder

**"Frontend won't connect to backend"**
- Check backend is running (`npm run dev` in backend folder)
- Verify backend URL in code (should be `http://localhost:5000`)

---

## 🎓 Learning Outcomes

This project teaches you:
- 🔗 Full-stack development (Frontend + Backend + Database)
- ⚛️ Modern React patterns
- 🟩 Node.js & Express API development
- 📊 MongoDB data modeling
- 🎨 Responsive UI design
- 🔐 Authentication & authorization
- 📱 Form validation & error handling
- 💾 Database persistence

---

## 📚 Key Workflows

### Issuing a Book
```
1. Member comes with request
2. Search for available book
3. Select book and member
4. System auto-sets 15-day return date
5. Book marked as unavailable
6. Transaction recorded
```

### Returning a Book
```
1. Member returns the book
2. Search for transaction
3. Enter actual return date
4. System calculates fine if late (₹10/day)
5. Goes to Fine Pay screen
6. If any fine: Must pay before completing
7. If no fine: Completes immediately
8. Book marked as available
```

### Adding a Member
```
1. Admin clicks "Add Membership"
2. Fills all required fields
3. Selects plan (6m, 1y, or 2y)
4. System calculates valid till date
5. Member created with "Active" status
```

---

## 🚀 Deployment

### Deploy on GitHub

See `GITHUB_UPLOAD_GUIDE.md` for step-by-step instructions.

Quick version:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Library-Management-System.git
git push -u origin main
```

### Deploy on Server
- Frontend: Deploy to Netlify, Vercel, or any static host
- Backend: Deploy to Heroku, Railway, or your server
- Database: Use MongoDB Atlas (cloud) for easy hosting

---

## 💡 Tips for Users

1. **Keep Data Clean**: Remove outdated members and books regularly
2. **Review Reports**: Check reports weekly for overdue books
3. **Communicate Fines**: Notify members about pending fines
4. **Backup Data**: Keep regular MongoDB backups
5. **Update Member Info**: Ask members to update contact details yearly

---

## 📞 Support & Questions

- 📖 See `SETUP_GUIDE.md` for detailed setup
- ✅ See `FINAL_REQUIREMENTS_COMPLIANCE.md` for all features
- 🐛 Check browser console for errors
- 📧 Review error messages on screen

---

## 📄 License

This project is open source and available for educational and personal use.

---

## 🎉 Ready to Go!

Your library management system is ready to organize your books!

**Start with:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd "Library Management System" && npm run dev

# Open: http://localhost:5173
# Login: admin/admin or user/user
```

**Happy managing!** 📚✨

---

**Made with ❤️ for librarians and book lovers everywhere** 📖
