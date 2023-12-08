"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const Dropdown: React.FC<IDropdown> = (props) => {
  const { values, defaultValue, placeholder, onChange = () => {} } = props;
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(
    defaultValue || placeholder || "Choose One"
  );
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  function _onToggleDropdown() {
    setIsActive(!isActive);
  }

  function _onChange(item: IItem) {
    setIsSelected(item.label);
    setIsActive(!isActive);
    onChange(item.value)
  }

  return (
    <div className={styles.dropdown}>
      <div onClick={_onToggleDropdown} className={styles.dropdownBtn}>
        <span
          className={
            selected.toLowerCase() === placeholder?.toLowerCase() ||
            selected.toLowerCase() === "choose one"
              ? styles.placeholder
              : styles.label
          }
        >
          {selected}
        </span>

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
        ref={ref}
        className={styles.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {values.map((item, index) => (
          <div
            key={index}
            onClick={() => _onChange(item)}
            className={styles.item}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

interface IDropdown {
  values: IItem[];
  defaultValue?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (value: string) => void;
}

interface IItem {
  label: string;
  value: string;
}

export default Dropdown;
