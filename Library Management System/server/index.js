import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDatabase } from './db.js'
import { LibraryState } from './models/LibraryState.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const defaultKey = 'main-library'

const seedData = {
  books: [
    { id: 1, title: 'Atomic Habits', author: 'James Clear', serialNo: 'BK-1001', type: 'book', category: 'Self Help', available: true },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', serialNo: 'BK-1002', type: 'book', category: 'Programming', available: true },
    { id: 3, title: 'Inception', author: 'Christopher Nolan', serialNo: 'MV-2001', type: 'movie', category: 'Science Fiction', available: true },
    { id: 4, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', serialNo: 'BK-1003', type: 'book', category: 'Programming', available: false },
  ],
  memberships: [
    { membershipNo: 'MBR-101', name: 'Asha Verma', email: 'asha@example.com', phone: '9876543210', plan: '1 year', status: 'Active', validTill: '2026-12-31' },
    { membershipNo: 'MBR-102', name: 'Rahul Singh', email: 'rahul@example.com', phone: '9876501234', plan: '6 months', status: 'Active', validTill: '2026-08-15' },
  ],
  users: [
    { id: 1, name: 'Admin User', username: 'admin', role: 'admin', status: 'Active' },
    { id: 2, name: 'Library User', username: 'user', role: 'user', status: 'Active' },
  ],
  transactions: [
    { id: 1, type: 'Issue', title: 'The Pragmatic Programmer', serialNo: 'BK-1003', author: 'Andrew Hunt', member: 'Asha Verma', issueDate: '2026-03-20', returnDate: '2026-04-04', status: 'Issued' },
  ],
}

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, date: new Date().toISOString() })
})

app.get('/api/library-state', async (_req, res) => {
  try {
    let state = await LibraryState.findOne({ key: defaultKey }).lean()

    if (!state) {
      state = await LibraryState.create({
        key: defaultKey,
        ...seedData,
      })
      state = state.toObject()
    }

    res.json({
      books: state.books ?? [],
      memberships: state.memberships ?? [],
      users: state.users ?? [],
      transactions: state.transactions ?? [],
    })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to load library state.' })
  }
})

app.put('/api/library-state', async (req, res) => {
  try {
    const { books, memberships, users, transactions } = req.body

    const state = await LibraryState.findOneAndUpdate(
      { key: defaultKey },
      {
        key: defaultKey,
        books: Array.isArray(books) ? books : [],
        memberships: Array.isArray(memberships) ? memberships : [],
        users: Array.isArray(users) ? users : [],
        transactions: Array.isArray(transactions) ? transactions : [],
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).lean()

    res.json({
      message: 'Library data saved successfully.',
      data: {
        books: state.books ?? [],
        memberships: state.memberships ?? [],
        users: state.users ?? [],
        transactions: state.transactions ?? [],
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to save library state.' })
  }
})

async function startServer() {
  try {
    await connectDatabase(process.env.MONGODB_URI)
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
