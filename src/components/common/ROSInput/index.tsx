"use client";
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

const ROSInput: React.FC<IROSInput> = (props) => {
  const { startAddon = () => <></>, endAddon = () => <></>, className, ...rest } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {startAddon?.()}
      <input {...rest} className={styles.inputElement} />
      {endAddon?.()}
    </div>
  );
};

interface IROSInput extends InputHTMLAttributes<HTMLInputElement> {
  startAddon?: () => React.ReactNode;
  endAddon?: () => React.ReactNode;
  className?: string
}

export default ROSInput;
