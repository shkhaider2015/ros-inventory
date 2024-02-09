"use client";
import React, { CSSProperties, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import styles from "./ROSInput.module.css";

const ROSInput: React.FC<IROSInput> = (props) => {
  const { startAddon = () => <></>, endAddon = () => <></>, className, inputStyle, ...rest } = props;
  return (
    <div className={`${styles.container} ${className}`} >
      {startAddon?.()}
      <input {...rest} className={`${styles.inputElement}`} style={inputStyle} />
      {endAddon?.()}
    </div>
  );
};

interface IROSInput extends InputHTMLAttributes<HTMLInputElement> {
  startAddon?: () => React.ReactNode;
  endAddon?: () => React.ReactNode;
  className?: string;
  inputStyle?: CSSProperties | undefined;
}

export default ROSInput;
