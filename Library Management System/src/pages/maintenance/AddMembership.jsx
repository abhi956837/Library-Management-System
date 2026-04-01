import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { validateAddMember } from '../../utils/validation'

export default function AddMembership({ addMember, setAddMember, msg, show, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateAddMember(addMember.membershipNo, addMember.name, addMember.email, addMember.phone, addMember.plan)
    if (error) {
      return show('error', error)
    }
    onSubmit(addMember)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>Add Membership</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <FormField label="Membership Number">
          <input type="text" value={addMember.membershipNo} onChange={(e) => setAddMember((v) => ({ ...v, membershipNo: e.target.value }))} />
        </FormField>
        <FormField label="Name">
          <input type="text" value={addMember.name} onChange={(e) => setAddMember((v) => ({ ...v, name: e.target.value }))} />
        </FormField>
        <FormField label="Email">
          <input type="email" value={addMember.email} onChange={(e) => setAddMember((v) => ({ ...v, email: e.target.value }))} />
        </FormField>
        <FormField label="Phone">
          <input type="text" value={addMember.phone} onChange={(e) => setAddMember((v) => ({ ...v, phone: e.target.value }))} />
        </FormField>
        <fieldset className="field field-full radio-group">
          <legend>Membership Duration</legend>
          {['6 months', '1 year', '2 years'].map((o) => (
            <label key={o}>
              <input type="radio" name="membershipPlan" checked={addMember.plan === o} onChange={() => setAddMember((v) => ({ ...v, plan: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <div className="actions field-full">
          <button type="submit">Add Membership</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
