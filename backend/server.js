import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import libraryRoutes from './routes/library.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use('/api', libraryRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ API endpoint: http://localhost:${PORT}/api/library-state`)
})
