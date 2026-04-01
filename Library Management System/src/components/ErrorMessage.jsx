export default function ErrorMessage({ msg }) {
  return msg.text ? <p className={`message ${msg.type}`}>{msg.text}</p> : null
}
