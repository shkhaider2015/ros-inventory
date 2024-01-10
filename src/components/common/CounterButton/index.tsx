"use client";
import { useLayoutEffect, useState } from "react";
import styles from "./styles.module.css";

const CounterButton: React.FC<ICounterButton> = (props) => {
  const {
    width = 110,
    value = 0,
    onChange = () => {},
    maxValue = 10,
    minValue = 0,
    disable = false,
  } = props;
  const [count, setCount] = useState<number>(value);

  useLayoutEffect(() => {
    setCount(value)
  }, [value])
  const _increment = () => {
    if (disable) return;
    setCount((pS) => {
      if (pS === maxValue) return pS;
      let val = pS + 1;
      onChange(val);
      return val;
    });
  };

  const _decrement = () => {
    if (disable) return;
    setCount((pS) => {
      if (pS === minValue) return pS;
      let val = pS > 0 ? pS - 1 : 0;
      onChange(val);
      return val;
    });
  };

  return (
    <div
      className={`${styles.container}`}
      style={{
        width: width,
      }}
    >
      <div
        className={`${styles.btn} ${disable ? styles.disable : ""}`}
        onClick={_decrement}
      >
        -
      </div>
      <div>{count}</div>
      <div
        className={`${styles.btn} ${styles.plusBtn} ${
          disable ? styles.disable : ""
        }`}
        onClick={_increment}
      >
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
  disable?: boolean;
}

export default CounterButton;
