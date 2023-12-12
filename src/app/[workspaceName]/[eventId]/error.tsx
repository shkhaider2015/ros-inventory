'use client'
import styles from './error.module.css';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    
  return (
    <div className={styles.container} >
      <h2>Something went wrong!</h2>
      <h4>{error.message}</h4>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}