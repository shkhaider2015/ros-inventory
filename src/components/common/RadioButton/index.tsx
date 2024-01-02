"use client";
import React from "react";
import styles from "./styles.module.css";

const RadioButton: React.FC<IRadioButton> = ({
  name,
  label,
  value,
  onChange,
}) => {


  function _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return (
    <div className={styles.container}>
      <label
        className={`${styles.customBtn} ${
          value ? styles.customBtnChecked : ""
        } `}
        htmlFor={name}
      >
        <input
          className={styles.btn}
          type="radio"
          name={name}
          id={name}
          checked={value}
          onChange={_onChange}
        />
      </label>

      <div className={styles.label}>{label}</div>
    </div>
  );
};

interface IRadioButton {
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default RadioButton;
