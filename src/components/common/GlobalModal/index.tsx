"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import { useSelector } from "react-redux";
import useModal from "@/hooks/useModal";

const GlobalModal = () => {
  const modalReducer = useSelector((state: any) => state.modal);
  const [element, setElement] = useState<Element | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { close } = useModal();

  useEffect(() => {
    if (typeof window !== "undefined")
      setElement(document.getElementById("modal-root"));
  }, []);

  function _handleClose() {
    close();
  }

  async function _onOk() {
    try {
      setLoading(true);
      await modalReducer?.onOk?.();
      _handleClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function _onCancel() {
    _handleClose()
  }

  const content = (
    <div
      className={`${styles.GContainer} ${
        modalReducer?.isOpen ? styles.visible : styles.hidden
      } `}
    >
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.closeIcon} onClick={_handleClose}>
            <Image
              src={"/images/icons/Close_round.svg"}
              alt="close-icon"
              width={30}
              height={30}
            />
          </div>
        </div>

        <div className={styles.GDesc}>
          <div>
            <div className={styles.warningIcon}>!</div>
          </div>
          <div>{modalReducer?.message ? modalReducer.message : "Are you sure to perform this action" }</div>
        </div>
        <div className={styles.GFooter}>
          <div className={styles.GBtnContainer}>
            <div>
              <Button
                label="Cancel"
                type="Danger"
                onClick={_onCancel}
                disable={loading}
              />
            </div>
            <div>
              <Button
                label="Ok"
                type="Primary"
                onClick={_onOk}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return element ? ReactDOM.createPortal(content, element) : <></>;
};

export default GlobalModal;
