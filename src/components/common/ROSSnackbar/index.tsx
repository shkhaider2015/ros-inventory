"use client";
import React from "react";
import styles from "./styles.module.css";

const ROSSnackbar: React.FC<IROSSnackbar> = (props) => {
  const { isActive, message, type } = props;
  return (
    <div
      className={
        isActive
          ? [styles.snackbar, styles.fadeIn, styles[type]].join(" ")
          : [styles.snackbar, styles.fadeOut].join(" ")
      }
    >
      {message}
    </div>
  );
};

interface IROSSnackbar {
  isActive: boolean;
  type: "success" | "danger" | "info";
  message: string;
}

export default ROSSnackbar;
