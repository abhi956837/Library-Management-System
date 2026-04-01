import { useEffect, useState } from 'react'
import styles from './Logout.module.css'

export default function Logout({ onLoginClick }) {
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    if (timer <= 0) {
      onLoginClick()
      return
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer, onLoginClick])

  return (
    <div className={styles.logoutContainer}>
      <div className={styles.messageBox}>
        <h2 className={styles.message}>You have successfully logged out.</h2>
        <p className={styles.timerText}>Redirecting to login in <span className={styles.timerValue}>{timer}</span> seconds...</p>
      </div>
    </div>
  )
}
