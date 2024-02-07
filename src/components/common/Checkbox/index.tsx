"use client";
import React from "react";
import styles from "./Checkbox.module.css";

const ROSCheckbox: React.FC<IROSCheckbox> = (props) => {
  const { label, id="my-checkbox", onChange=()=>{}, defaultChecked } = props;

  // console.log("Default Checked ", defaultChecked);
  
  return (
    <div className={styles.container}>
      <input checked={defaultChecked} type="checkbox" id={id} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id}>{label ? label : ""  } </label>
    </div>
  );
};

interface IROSCheckbox {
  label?: string;
  id?: string;
  onChange?: (val:boolean) => void;
  defaultChecked?: boolean | undefined;
}

export default ROSCheckbox;
