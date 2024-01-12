import React from "react";
import styles from './styles.module.css';
import Header from "@/components/Header";
import GlobalModal from "../common/GlobalModal";
import ProgressLoader from "../common/ProgressLoader";

const LayoutComp = ({ children }:{children: React.ReactNode}) => {


  return (
    <div className={styles.container} >
      <ProgressLoader />
      <Header />
      {children}
      <GlobalModal />
    </div>
  );
};

export default LayoutComp;
