"use client";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { CSSProperties } from "react";

const ProgressLoader = () => {
  const progressLoader = useSelector((state: any) => state.progressLoader);

  const style: CSSProperties = progressLoader?.isProgress ? {
    width: '80%',
    transition: "width 4s ease-out"
  } : {
    width: '0%',
    transform: 'unset'
  };

  return <div className={`${styles.container}`} style={style} />;
};

export default ProgressLoader;
