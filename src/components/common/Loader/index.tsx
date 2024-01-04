"use client";
import React, { CSSProperties } from "react";
import styles from "./styles.module.css";

const Loader: React.FC<ILoader> = (props) => {
  const { size = "20px", theme = "DARK" } = props;

  const style: CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div
      className={`${styles.loaderRoot} ${
        theme === "LIGHT" ? styles.lightLoader : ""
      } ${theme === "PRIMARY" ? styles.primaryLoader : ""} `}
      style={style}
    />
  );
};

interface ILoader {
  size?: string;
  theme?: "DARK" | "LIGHT" | "PRIMARY";
}

export default Loader;
