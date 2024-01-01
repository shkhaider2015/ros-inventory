"use client";
import React, { CSSProperties } from "react";
import styles from "./styles.module.css";

const Loader: React.FC<ILoader> = (props) => {
  const { size = "20px", color = '#6200EE' } = props;

  const style:CSSProperties = {
    width: size,
    height: size,
  }

  return <div className={`${styles.loaderRoot}`} style={style} />;
};

interface ILoader {
  size?: string;
  color?: string;
}

export default Loader;
