"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import Image from "next/image";

const ROSModal: React.FC<IROSModal> = ({ open, onClose, children }) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined")
      setElement(document.getElementById("modal-root"));
  }, []);

  function _handleClose() {
    onClose();
  }


  const content = (
    <div
      className={`${styles.ROSContainer} ${
        open ? styles.visible : styles.hidden
      } `}
    >
      <div className={styles.contentContainer}>
        <div className={styles.header}>
            <div className={styles.closeIcon} onClick={_handleClose} >
                <Image src={'/images/icons/Close_round.svg'} alt="close-icon" width={30} height={30} />
            </div>
        </div>
        {children}
      </div>
    </div>
  );

  return element ? ReactDOM.createPortal(content, element) : <></>;
};

interface IROSModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode
}

export default ROSModal;
