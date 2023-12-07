"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const Dropdown:React.FC<IDropdown> = (props) => {
  const { values, defaultValue } = props;

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose one");
  return (
    <div className={styles.dropdown}>
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className={styles.dropdownBtn}
      >
        {selected}
        <Image
          src={
            isActive
              ? "/images/icons/Expand_up.svg"
              : "/images/icons/Expand_down.svg"
          }
          alt="caret"
          width={18}
          height={18}
        />
      </div>
      <div
        className={styles.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        <div
          onClick={(e) => {
            setIsSelected("one");
            setIsActive(!isActive);
          }}
          className={styles.item}
        >
          One
        </div>
        <div
          className={styles.item}
          onClick={(e) => {
            setIsSelected("two");
            setIsActive(!isActive);
          }}
        >
          Two
        </div>
        <div
          className={styles.item}
          onClick={(e) => {
            setIsSelected("three");
            setIsActive(!isActive);
          }}
        >
          Three
        </div>
      </div>
    </div>
  );
};

interface IDropdown {
    values: { label: string, value: string }[];
    defaultValue?: string
}

export default Dropdown;
