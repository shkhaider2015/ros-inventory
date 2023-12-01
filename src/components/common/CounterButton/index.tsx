"use client"
import styles from "./styles.module.css";

const CounterButton = () => {
  return (
    <div className={styles.container} style={{
        width: 80
    }} >
      <div className={styles.btn} >-</div>
      <div>2</div>
      <div className={styles.btn} >+</div>
    </div>
  );
};

export default CounterButton;
