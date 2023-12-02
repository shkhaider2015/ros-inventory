"use client";
import { useState } from "react";
import styles from "./styles.module.css";

const CounterButton: React.FC<ICounterButton> = (props) => {
  const {
    width = 110,
    value = 1,
    onChange = () => {},
    maxValue = 10,
    minValue = 1,
  } = props;
  const [count, setCount] = useState<number>(value);

  const _increment = () =>
    setCount((pS) => {
      if (pS === maxValue) return pS;
      let val = pS + 1;
      onChange(val);
      return val;
    });
  const _decrement = () =>
    setCount((pS) => {
      if (pS === minValue) return pS;
      let val = pS > 1 ? pS - 1 : 1;
      onChange(val);
      return val;
    });
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
  maxValue?: number;
  minValue?: number;
  onChange?: (val: number) => void;
}

export default CounterButton;
