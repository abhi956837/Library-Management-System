import Navbar from './Navbar'

export default function Layout({ auth, currentScreen, onNavigate, onLogout, children }) {
  return (
    <main className="app-shell">
      <Navbar auth={auth} currentScreen={currentScreen} onNavigate={onNavigate} onLogout={onLogout} />
      <section className="content-area">{children}</section>
    </main>
  )
}
