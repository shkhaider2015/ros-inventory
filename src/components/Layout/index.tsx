import React from "react";
import styles from './styles.module.css';
import Header from "@/components/Header";

const LayoutComp = ({ children }:{children: React.ReactNode}) => {


  return (
    <div className={styles.container} >
      <Header />
      {children}
    </div>
  );
};

export default LayoutComp;
