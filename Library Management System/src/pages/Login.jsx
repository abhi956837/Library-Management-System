import FormField from '../components/FormField'
import ErrorMessage from '../components/ErrorMessage'
import { validateLoginForm } from '../utils/validation'

export default function LoginPage({ login, setLogin, msg, show, clear, onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateLoginForm(login.username, login.password, login.role)
    if (error) {
      return show('error', error)
    }
    onLogin()
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <div>
          <p className="eyebrow">Library Management System</p>
          <h1>Sign in</h1>
          <p className="intro-copy">Use the login form below. Passwords are hidden, and role decides which modules you can access.</p>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(0, 102, 204, 0.05)', borderRadius: '8px', fontSize: '0.9rem', color: '#0f2951' }}>
            <strong>Demo Credentials:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Admin: username <code style={{ backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px' }}>admin</code> / password <code style={{ backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px' }}>admin</code></li>
              <li>User: username <code style={{ backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px' }}>user</code> / password <code style={{ backgroundColor: '#fff', padding: '2px 4px', borderRadius: '3px' }}>user</code></li>
            </ul>
          </div>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <FormField label="Username" full>
            <input
              type="text"
              value={login.username}
              onChange={(e) => setLogin((v) => ({ ...v, username: e.target.value }))}
              placeholder="Enter username"
            />
          </FormField>
          <FormField label="Password" full>
            <input
              type="password"
              value={login.password}
              onChange={(e) => setLogin((v) => ({ ...v, password: e.target.value }))}
              placeholder="Enter password"
            />
          </FormField>
          <fieldset className="field field-full radio-group">
            <legend>Role</legend>
            {['admin', 'user'].map((r) => (
              <label key={r}>
                <input
                  type="radio"
                  name="loginRole"
                  checked={login.role === r}
                  onChange={() => setLogin((v) => ({ ...v, role: r }))}
                />
                <span>{r}</span>
              </label>
            ))}
          </fieldset>
          <div className="actions field-full">
            <button type="submit">Login</button>
          </div>
        </form>
        <ErrorMessage msg={msg} />
      </section>
    </main>
  )
}
