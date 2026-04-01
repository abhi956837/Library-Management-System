import mongoose from 'mongoose'

const librarySchema = new mongoose.Schema(
  {
    books: [
      {
        id: Number,
        title: String,
        author: String,
        serialNo: String,
        type: String,
        category: String,
        available: Boolean,
      },
    ],
    memberships: [
      {
        membershipNo: String,
        name: String,
        email: String,
        phone: String,
        plan: String,
        status: String,
        validTill: String,
      },
    ],
    users: [
      {
        id: Number,
        name: String,
        username: String,
        role: String,
        status: String,
      },
    ],
    transactions: [
      {
        id: Number,
        type: String,
        title: String,
        serialNo: String,
        author: String,
        member: String,
        issueDate: String,
        returnDate: String,
        actualReturnDate: String,
        remarks: String,
        status: String,
        fineAmount: Number,
        finePaid: Boolean,
        fineRemarks: String,
      },
    ],
  },
  { timestamps: true },
)

const Library = mongoose.model('Library', librarySchema)

export default Library
