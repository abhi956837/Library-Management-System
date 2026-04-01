export const validateLoginForm = (username, password, role) => {
  if (!username.trim() || !password.trim()) {
    return 'Username and password are required.'
  }

  // Admin credentials validation
  if (role === 'admin') {
    if (username.trim() !== 'admin' || password.trim() !== 'admin') {
      return 'Invalid admin credentials. Use admin/admin.'
    }
  }

  // User credentials validation
  if (role === 'user') {
    if (username.trim() !== 'user' || password.trim() !== 'user') {
      return 'Invalid user credentials. Use user/user.'
    }
  }

  return null
}

export const validateBookSearch = (title, category) => {
  if (!title.trim() && !category) {
    return 'Enter a book name or select a category before searching.'
  }
  return null
}

export const validateBookIssue = (bookId, memberName, issueDate, returnDate, today, issueDateParam) => {
  if (!bookId || !memberName || !issueDate || !returnDate) {
    return 'Fill all required fields before submitting the book issue form.'
  }
  if (issueDate < today) {
    return 'Issue date cannot be earlier than today.'
  }
  const maxReturnDate = new Date(issueDateParam || issueDate)
  maxReturnDate.setDate(maxReturnDate.getDate() + 15)
  if (new Date(returnDate) > maxReturnDate) {
    return 'Return date cannot be greater than 15 days from the issue date.'
  }
  return null
}

export const validateReturnBook = (transactionId, bookName, serialNo, issueDate, returnDate) => {
  if (!transactionId || !bookName || !serialNo || !issueDate || !returnDate) {
    return 'Fill all required fields before confirming the return book form.'
  }
  return null
}

export const validateAddMember = (membershipNo, name, email, phone, plan) => {
  if (!membershipNo.trim() || !name.trim() || !email.trim() || !phone.trim() || !plan) {
    return 'All fields are mandatory in Add Membership.'
  }
  return null
}

export const validateAddBook = (title, author, serialNo, category) => {
  if (!title.trim() || !author.trim() || !serialNo.trim() || !category.trim()) {
    return 'Enter all details before confirming Add Book.'
  }
  return null
}

export const validateUserForm = (name, username, mode) => {
  if (!name.trim()) {
    return 'Name is mandatory in User Management.'
  }
  if (mode === 'new' && !username.trim()) {
    return 'Username is mandatory for a new user.'
  }
  return null
}
