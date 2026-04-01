import { useEffect } from 'react'
import styles from './TransactionSuccess.module.css'

export default function TransactionSuccess({ message = 'Transaction completed successfully.', onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={styles.successBox}>
      <h2 className={styles.message}>{message}</h2>
      <p className={styles.redirectText}>Redirecting in 2 seconds...</p>
    </div>
  )
}
