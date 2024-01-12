"use client";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { CSSProperties } from "react";

const ProgressLoader = () => {
  const progressLoader = useSelector((state: any) => state.progressLoader);

  console.log("IsProgress : ", progressLoader);

  return (
    <div
      className={`${styles.container} ${
        progressLoader?.isProgress ? styles.animate : ""
      } `}
    />
  );
};

export default ProgressLoader;
