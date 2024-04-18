import React from "react";
import { Modal } from "antd";
import styles from  "./filepreview.module.css"

const FilePreview: React.FC<IPreviewProps> = ({ open, onClose, fileUrl }) => {

  const handleClose = () => {
    onClose();
  
  };

  console.log(fileUrl);
  return (
    <Modal visible={open} onCancel={handleClose} footer={null} width={700}>
      <div className={styles.FilePreviewContent}>
        <img
          src={fileUrl}
          alt="Selected Image"
          style={{ maxWidth: "100%", maxHeight: "500px" }}
        />
      </div>
    </Modal>
  );
};
interface IPreviewProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  file_type: string;
}

export default FilePreview;
