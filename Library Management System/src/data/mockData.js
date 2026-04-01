export const seedBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', serialNo: 'BK-1001', type: 'book', category: 'Self Help', available: true },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', serialNo: 'BK-1002', type: 'book', category: 'Programming', available: true },
  { id: 3, title: 'Inception', author: 'Christopher Nolan', serialNo: 'MV-2001', type: 'movie', category: 'Science Fiction', available: true },
  { id: 4, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', serialNo: 'BK-1003', type: 'book', category: 'Programming', available: false },
]

export const seedMembers = [
  { membershipNo: 'MBR-101', name: 'Asha Verma', email: 'asha@example.com', phone: '9876543210', plan: '1 year', status: 'Active', validTill: '2026-12-31' },
  { membershipNo: 'MBR-102', name: 'Rahul Singh', email: 'rahul@example.com', phone: '9876501234', plan: '6 months', status: 'Active', validTill: '2026-08-15' },
]

export const seedUsers = [
  { id: 1, name: 'Admin User', username: 'admin', role: 'admin', status: 'Active' },
  { id: 2, name: 'Library User', username: 'user', role: 'user', status: 'Active' },
]

export const seedTx = [
  { id: 1, type: 'Issue', title: 'The Pragmatic Programmer', serialNo: 'BK-1003', author: 'Andrew Hunt', member: 'Asha Verma', issueDate: '2026-03-20', returnDate: '2026-04-04', status: 'Issued' },
]

export const nav = {
  admin: ['dashboard', 'bookAvailable', 'bookIssue', 'returnBook', 'finePay', 'addMembership', 'updateMembership', 'addBook', 'updateBook', 'userManagement', 'reports'],
  user: ['dashboard', 'bookAvailable', 'bookIssue', 'returnBook', 'finePay', 'reports'],
}

export const labels = {
  dashboard: 'Dashboard',
  bookAvailable: 'Book Available',
  bookIssue: 'Book Issue',
  returnBook: 'Return Book',
  finePay: 'Fine Pay',
  addMembership: 'Add Membership',
  updateMembership: 'Update Membership',
  addBook: 'Add Book',
  updateBook: 'Update Book',
  userManagement: 'User Management',
  reports: 'Reports',
}
