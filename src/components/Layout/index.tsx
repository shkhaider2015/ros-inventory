import React from "react";
import styles from './styles.module.css';
import Header from "@/components/Header";
import GlobalModal from "../common/GlobalModal";

const LayoutComp = ({ children }:{children: React.ReactNode}) => {


  return (
    <div className={styles.container} >
      <Header />
      {children}
      <GlobalModal />
    </div>
  );
};

export default LayoutComp;
