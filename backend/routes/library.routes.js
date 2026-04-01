import express from 'express'
import Library from '../models/library.model.js'

const router = express.Router()

// GET - Retrieve all library data
router.get('/library-state', async (req, res) => {
  try {
    let library = await Library.findOne()

    // If no data exists yet, return empty structure
    if (!library) {
      return res.json({
        books: [],
        memberships: [],
        users: [],
        transactions: [],
      })
    }

    res.json({
      books: library.books || [],
      memberships: library.memberships || [],
      users: library.users || [],
      transactions: library.transactions || [],
    })
  } catch (error) {
    console.error('Error fetching library state:', error)
    res.status(500).json({ error: 'Failed to fetch library state' })
  }
})

// PUT - Save all library data
router.put('/library-state', async (req, res) => {
  try {
    const { books, memberships, users, transactions } = req.body

    // Validate data
    if (!Array.isArray(books) || !Array.isArray(memberships) || !Array.isArray(users) || !Array.isArray(transactions)) {
      return res.status(400).json({ error: 'Invalid data format' })
    }

    // Find and update, or create new document
    let library = await Library.findOne()

    if (!library) {
      library = new Library({
        books,
        memberships,
        users,
        transactions,
      })
    } else {
      library.books = books
      library.memberships = memberships
      library.users = users
      library.transactions = transactions
    }

    await library.save()
    res.json({ success: true, message: 'Library state saved successfully' })
  } catch (error) {
    console.error('Error saving library state:', error)
    res.status(500).json({ error: 'Failed to save library state' })
  }
})

export default router
