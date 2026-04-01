import mongoose from 'mongoose'

const libraryStateSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    books: {
      type: Array,
      default: [],
    },
    memberships: {
      type: Array,
      default: [],
    },
    users: {
      type: Array,
      default: [],
    },
    transactions: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

export const LibraryState = mongoose.model('LibraryState', libraryStateSchema)
