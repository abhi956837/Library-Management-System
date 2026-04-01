import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'

export default function UpdateMembership({ memberships, updateMember, setUpdateMember, msg, show, clear, onLoadMember, onSubmit }) {
  const handleLoadMember = () => {
    if (!updateMember.membershipNo.trim()) return show('error', 'Membership Number is mandatory.')
    const record = memberships.find((m) => m.membershipNo === updateMember.membershipNo.trim())
    if (!record) return show('error', 'Membership not found.')
    setUpdateMember((v) => ({ ...v, name: record.name, email: record.email, phone: record.phone, plan: record.plan }))
    clear()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!updateMember.membershipNo.trim()) return show('error', 'Membership Number is mandatory.')
    onSubmit(updateMember)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>Update Membership</h2>
        </div>
      </div>
      <div className="inline-tools">
        <FormField label="Membership Number">
          <input type="text" value={updateMember.membershipNo} onChange={(e) => setUpdateMember((v) => ({ ...v, membershipNo: e.target.value }))} />
        </FormField>
        <button type="button" onClick={handleLoadMember}>
          Load Membership
        </button>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <FormField label="Name">
          <input type="text" value={updateMember.name} readOnly />
        </FormField>
        <FormField label="Email">
          <input type="text" value={updateMember.email} readOnly />
        </FormField>
        <FormField label="Phone">
          <input type="text" value={updateMember.phone} readOnly />
        </FormField>
        <FormField label="Current Plan">
          <input type="text" value={updateMember.plan} readOnly />
        </FormField>
        <fieldset className="field field-full radio-group">
          <legend>Action</legend>
          {['extend', 'cancel'].map((o) => (
            <label key={o}>
              <input type="radio" name="membershipAction" checked={updateMember.action === o} onChange={() => setUpdateMember((v) => ({ ...v, action: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="field field-full radio-group">
          <legend>Extension</legend>
          {['6 months', '1 year'].map((o) => (
            <label key={o}>
              <input type="radio" name="membershipExtension" checked={updateMember.extension === o} onChange={() => setUpdateMember((v) => ({ ...v, extension: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <div className="actions field-full">
          <button type="submit">Update Membership</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
