"use client";
import { useState } from "react";
import styles from "./styles.module.css";

const CounterButton: React.FC<ICounterButton> = (props) => {
  const { width = 110, value = 1 } = props;
  const [count, setCount] = useState<number>(value);

  const _increment = () => setCount((pS) => pS + 1);
  const _decrement = () => setCount((pS) => (pS > 1 ? pS - 1 : 1));
  return (
    <div
      className={styles.container}
      style={{
        width: width,
      }}
    >
      <div className={styles.btn} onClick={_decrement}>
        -
      </div>
      <div>{count}</div>
      <div className={`${styles.btn} ${styles.plusBtn}`} onClick={_increment}>
        +
      </div>
    </div>
  );
};

interface ICounterButton {
  width?: string | number;
  value?: number;
}

export default CounterButton;
