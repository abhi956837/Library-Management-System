export default function FormField({ label, children, full }) {
  return (
    <label className={`field${full ? ' field-full' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}
