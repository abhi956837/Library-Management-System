import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { validateUserForm } from '../../utils/validation'

export default function UserManagement({ users, userForm, setUserForm, msg, show, onPickExistingUser, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateUserForm(userForm.name, userForm.username, userForm.mode)
    if (error) {
      return show('error', error)
    }
    onSubmit(userForm)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>User Management</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <fieldset className="field field-full radio-group">
          <legend>User Type</legend>
          {['new', 'existing'].map((o) => (
            <label key={o}>
              <input type="radio" name="userMode" checked={userForm.mode === o} onChange={() => setUserForm((v) => ({ ...v, mode: o }))} />
              <span>{o} user</span>
            </label>
          ))}
        </fieldset>
        {userForm.mode === 'existing' ? (
          <FormField label="Select Existing User" full>
            <select value={userForm.id} onChange={(e) => onPickExistingUser(e.target.value)}>
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </FormField>
        ) : null}
        <FormField label="Name">
          <input type="text" value={userForm.name} onChange={(e) => setUserForm((v) => ({ ...v, name: e.target.value }))} />
        </FormField>
        <FormField label="Username">
          <input type="text" value={userForm.username} readOnly={userForm.mode === 'existing'} onChange={(e) => setUserForm((v) => ({ ...v, username: e.target.value }))} />
        </FormField>
        <FormField label="Role">
          <select value={userForm.role} onChange={(e) => setUserForm((v) => ({ ...v, role: e.target.value }))}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>
        <FormField label="Status">
          <select value={userForm.status} onChange={(e) => setUserForm((v) => ({ ...v, status: e.target.value }))}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </FormField>
        <div className="actions field-full">
          <button type="submit">Save User</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
