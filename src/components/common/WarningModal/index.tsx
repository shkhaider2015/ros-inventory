"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import ROSModal from "../ROSModal";
import Button from "../Button";

const defaultMessage: string = "Are you sure you want to perform this action?";

const WarningModal: React.FC<IWarningModal> = (props) => {
  const {
    open,
    onClose,
    title,
    description = defaultMessage,
    onOk,
    onCancel,
  } = props;
  const [loading, setLoading] = useState(false);

  const _onOk = async () => {
    console.log("Ok Clicked");
    try {
      setLoading(true);
      let promise = new Promise((resolve, reject) => {
        let isOk = onOk?.();
        if (isOk) resolve("");
        else reject("");
      });
      await promise;
      handleClose()
    } catch (error) {
      console.error("On Ok Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const _onCancel = async () => {
    console.log("Cancel Clicked");
    onCancel?.();
    onClose()
  };

  const handleClose = () => {
    onClose()
  }

  const content = (
    <div className={styles.contentContainer}>
      <div className={styles.mainSec}>
        {title &&  <div className={styles.title}>{title}</div>}
        <div className={styles.desc}>{description}</div>
      </div>
      <div className={styles.footerSec}>
        <div className={styles.btnCon}>
          <div>
            <Button
              disable={loading}
              type="Danger"
              label="Cancel"
              onClick={_onCancel}
            />
          </div>
          <div>
            <Button loading={loading} label="OK" onClick={_onOk} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ROSModal open={open} onClose={handleClose}>
      {content}
    </ROSModal>
  );
};

interface IWarningModal {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export default WarningModal;
