import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import Layout from './components/Layout'
import LoginPage from './pages/Login'
import LogoutPage from './pages/Logout'
import TransactionSuccess from './pages/TransactionSuccess'
import DashboardPage from './pages/Dashboard'
import BookAvailable from './pages/transactions/BookAvailable'
import BookIssue from './pages/transactions/BookIssue'
import ReturnBook from './pages/transactions/ReturnBook'
import FinePay from './pages/transactions/FinePay'
import AddMembership from './pages/maintenance/AddMembership'
import UpdateMembership from './pages/maintenance/UpdateMembership'
import AddBook from './pages/maintenance/AddBook'
import UpdateBook from './pages/maintenance/UpdateBook'
import UserManagement from './pages/maintenance/UserManagement'
import Reports from './pages/reports/Reports'

import { seedBooks, seedMembers, seedUsers, seedTx, nav } from './data/mockData'
import { today, plusDays } from './utils/date'

const emptyIssue = () => ({ bookId: '', memberName: '', author: '', issueDate: today(), returnDate: plusDays(today(), 15), remarks: '' })
const emptyFine = { transactionId: '', title: '', memberName: '', issueDate: '', dueDate: '', actualReturnDate: '', fineAmount: 0, finePaid: false, remarks: '' }
const API_URL = 'http://localhost:5000/api/library-state'

function App() {
  const [books, setBooks] = useState(seedBooks)
  const [memberships, setMemberships] = useState(seedMembers)
  const [users, setUsers] = useState(seedUsers)
  const [transactions, setTransactions] = useState(seedTx)
  const [auth, setAuth] = useState(null)
  const [screen, setScreen] = useState('dashboard')
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [showLogoutPage, setShowLogoutPage] = useState(false)
  const [showSuccessPage, setShowSuccessPage] = useState({ show: false, message: '' })

  const [login, setLogin] = useState({ username: '', password: '', role: 'admin' })
  const [search, setSearch] = useState({ title: '', category: '', selectedBookId: '' })
  const [results, setResults] = useState(seedBooks.filter((b) => b.available))
  const [issue, setIssue] = useState(emptyIssue())
  const [ret, setRet] = useState({ transactionId: '', bookName: '', author: '', serialNo: '', memberName: '', issueDate: '', returnDate: '' })
  const [fine, setFine] = useState(emptyFine)
  const [addMember, setAddMember] = useState({ membershipNo: '', name: '', email: '', phone: '', plan: '6 months' })
  const [updateMember, setUpdateMember] = useState({ membershipNo: '', name: '', email: '', phone: '', plan: '', action: 'extend', extension: '6 months' })
  const [addBook, setAddBook] = useState({ type: 'book', title: '', author: '', serialNo: '', category: '' })
  const [updateBook, setUpdateBook] = useState({ lookupSerialNo: '', type: 'book', title: '', author: '', serialNo: '', category: '', available: 'yes' })
  const [userForm, setUserForm] = useState({ mode: 'new', id: '', name: '', username: '', role: 'user', status: 'Active' })
  const [isLoadedFromServer, setIsLoadedFromServer] = useState(false)
  const isSavingRef = useRef(false)

  const show = (type, text) => setMsg({ type, text })
  const clear = () => setMsg({ type: '', text: '' })

  const go = (next) => {
    const allowed = auth ? nav[auth.role] : []
    if (allowed.includes(next)) {
      clear()
      setScreen(next)
    }
  }

  const handleLogin = () => {
    setAuth({ name: login.username.trim(), role: login.role })
    setScreen('dashboard')
    clear()
  }

  const handleLogout = () => {
    setShowLogoutPage(true)
  }

  const handleBackToLogin = () => {
    setAuth(null)
    setShowLogoutPage(false)
    setLogin({ username: '', password: '', role: 'admin' })
    clear()
  }


  const onLogin = (e) => {
    e.preventDefault()
    if (!login.username.trim() || !login.password.trim()) return show('error', 'Username and password are required.')
    handleLogin()
  }

  const handleSubmitIssue = (book) => {
    setTransactions((v) => [{ id: Date.now(), type: 'Issue', title: book.title, serialNo: book.serialNo, author: book.author, member: issue.memberName, issueDate: issue.issueDate, returnDate: issue.returnDate, remarks: issue.remarks, status: 'Issued' }, ...v])
    setBooks((v) => v.map((b) => (b.id === book.id ? { ...b, available: false } : b)))
    setResults((v) => v.filter((b) => b.id !== book.id))
    setIssue(emptyIssue())
    setShowSuccessPage({ show: true, message: `"${book.title}" has been issued successfully.` })
  }

  const handleSubmitReturn = (tx) => {
    const daysLate = Math.max(0, Math.ceil((new Date(ret.returnDate) - new Date(tx.returnDate)) / 86400000))
    setFine({ transactionId: String(tx.id), title: tx.title, memberName: tx.member || '', issueDate: tx.issueDate, dueDate: tx.returnDate, actualReturnDate: ret.returnDate, fineAmount: daysLate * 10, finePaid: false, remarks: '' })
    setScreen('finePay')
    show('success', 'Return details captured. Complete the Fine Pay page to finish the transaction.')
  }

  const handleSubmitFine = () => {
    const txId = Number(fine.transactionId)
    const tx = transactions.find((t) => t.id === txId)
    setTransactions((v) => v.map((t) => (t.id === txId ? { ...t, status: 'Returned', actualReturnDate: fine.actualReturnDate, fineAmount: fine.fineAmount, finePaid: fine.fineAmount === 0 ? true : fine.finePaid, fineRemarks: fine.remarks } : t)))
    if (tx?.serialNo) setBooks((v) => v.map((b) => (b.serialNo === tx.serialNo ? { ...b, available: true } : b)))
    setRet({ transactionId: '', bookName: '', author: '', serialNo: '', memberName: '', issueDate: '', returnDate: '' })
    setFine(emptyFine)
    setShowSuccessPage({ show: true, message: 'Transaction completed successfully.' })
  }

  const handleSubmitAddMember = (member) => {
    const days = { '6 months': 180, '1 year': 365, '2 years': 730 }[member.plan]
    setMemberships((v) => [{ ...member, status: 'Active', validTill: plusDays(today(), days) }, ...v])
    setAddMember({ membershipNo: '', name: '', email: '', phone: '', plan: '6 months' })
    show('success', 'Membership added successfully.')
  }

  const handleSubmitUpdateMember = (updated) => {
    setMemberships((v) =>
      v.map((m) => {
        if (m.membershipNo !== updated.membershipNo.trim()) return m
        if (updated.action === 'cancel') return { ...m, status: 'Cancelled' }
        return { ...m, validTill: plusDays(m.validTill, updated.extension === '1 year' ? 365 : 180) }
      }),
    )
    show('success', 'Membership updated successfully.')
  }

  const handleSubmitAddBook = (bookData) => {
    setBooks((v) => [{ id: Date.now(), ...bookData, available: true }, ...v])
    setAddBook({ type: 'book', title: '', author: '', serialNo: '', category: '' })
    show('success', 'Book added successfully.')
  }

  const handleSubmitUpdateBook = (updated) => {
    setBooks((v) =>
      v.map((b) =>
        b.serialNo === updated.lookupSerialNo
          ? { ...b, type: updated.type, title: updated.title, author: updated.author, serialNo: updated.serialNo, category: updated.category, available: updated.available === 'yes' }
          : b,
      ),
    )
    show('success', 'Book details updated successfully.')
  }

  const handlePickExistingUser = (id) => {
    const user = users.find((u) => String(u.id) === id)
    if (!user) return
    setUserForm({ mode: 'existing', id: String(user.id), name: user.name, username: user.username, role: user.role, status: user.status })
    clear()
  }

  const handleSubmitUser = (form) => {
    if (form.mode === 'new') {
      setUsers((v) => [{ id: Date.now(), name: form.name, username: form.username, role: form.role, status: form.status }, ...v])
      setUserForm({ mode: 'new', id: '', name: '', username: '', role: 'user', status: 'Active' })
      return show('success', 'New user created successfully.')
    }
    if (!form.id) return show('error', 'Select an existing user to update.')
    setUsers((v) => v.map((u) => (String(u.id) === form.id ? { ...u, name: form.name, role: form.role, status: form.status } : u)))
    setUserForm({ mode: 'new', id: '', name: '', username: '', role: 'user', status: 'Active' })
    show('success', 'Existing user updated successfully.')
  }

  useEffect(() => {
    let ignore = false

    async function loadLibraryState() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to load library data.')
        }

        const data = await response.json()
        if (ignore) return

        setBooks(Array.isArray(data.books) ? data.books : seedBooks)
        setMemberships(Array.isArray(data.memberships) ? data.memberships : seedMembers)
        setUsers(Array.isArray(data.users) ? data.users : seedUsers)
        setTransactions(Array.isArray(data.transactions) ? data.transactions : seedTx)
        setResults(Array.isArray(data.books) ? data.books.filter((book) => book.available) : seedBooks.filter((book) => book.available))
      } catch {
        if (!ignore) {
          show('error', 'Could not connect to MongoDB API. Showing local sample data.')
        }
      } finally {
        if (!ignore) {
          setIsLoadedFromServer(true)
        }
      }
    }

    loadLibraryState()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (!isLoadedFromServer || isSavingRef.current) {
      return
    }

    const controller = new AbortController()

    async function saveLibraryState() {
      isSavingRef.current = true

      try {
        await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            books,
            memberships,
            users,
            transactions,
          }),
          signal: controller.signal,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Auto-save failed:', error)
        }
      } finally {
        isSavingRef.current = false
      }
    }

    saveLibraryState()

    return () => {
      controller.abort()
    }
  }, [books, memberships, users, transactions, isLoadedFromServer])

  if (!auth) {
    return <LoginPage login={login} setLogin={setLogin} msg={msg} show={show} clear={clear} onLogin={handleLogin} />
  }

  if (showLogoutPage) {
    return <LogoutPage onLoginClick={handleBackToLogin} />
  }

  const renderPage = () => {
    if (showSuccessPage && showSuccessPage.show) {
      return (
        <TransactionSuccess
          message={showSuccessPage.message}
          onComplete={() => {
            setShowSuccessPage({ show: false, message: '' })
            setScreen('dashboard')
          }}
        />
      )
    }

    switch (screen) {
      case 'dashboard':
        return <DashboardPage auth={auth} books={books} memberships={memberships} transactions={transactions} />
      case 'bookAvailable':
        return <BookAvailable books={books} search={search} setSearch={setSearch} results={results} setResults={setResults} msg={msg} show={show} clear={clear} />
      case 'bookIssue':
        return <BookIssue books={books} memberships={memberships} issue={issue} setIssue={setIssue} msg={msg} show={show} onSubmit={handleSubmitIssue} />
      case 'returnBook':
        return <ReturnBook transactions={transactions} ret={ret} setRet={setRet} msg={msg} show={show} onSubmit={handleSubmitReturn} />
      case 'finePay':
        return <FinePay fine={fine} setFine={setFine} msg={msg} show={show} onSubmit={handleSubmitFine} />
      case 'addMembership':
        return <AddMembership addMember={addMember} setAddMember={setAddMember} msg={msg} show={show} onSubmit={handleSubmitAddMember} />
      case 'updateMembership':
        return <UpdateMembership memberships={memberships} updateMember={updateMember} setUpdateMember={setUpdateMember} msg={msg} show={show} clear={clear} onLoadMember={() => {}} onSubmit={handleSubmitUpdateMember} />
      case 'addBook':
        return <AddBook addBook={addBook} setAddBook={setAddBook} msg={msg} show={show} onSubmit={handleSubmitAddBook} />
      case 'updateBook':
        return <UpdateBook books={books} updateBook={updateBook} setUpdateBook={setUpdateBook} msg={msg} show={show} clear={clear} onLoadBook={() => {}} onSubmit={handleSubmitUpdateBook} />
      case 'userManagement':
        return <UserManagement users={users} userForm={userForm} setUserForm={setUserForm} msg={msg} show={show} onPickExistingUser={handlePickExistingUser} onSubmit={handleSubmitUser} />
      case 'reports':
        return <Reports transactions={transactions} />
      default:
        return <DashboardPage auth={auth} books={books} memberships={memberships} transactions={transactions} />
    }
  }

  return (
    <Layout auth={auth} currentScreen={screen} onNavigate={go} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  )
}

export default App
