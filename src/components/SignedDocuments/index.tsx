"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./signedDocument.module.css";
import Image from "next/image";
import moment from "moment";
import Button from "../common/Button";
import { IAttachements } from "@/screens/Home";
import ROSCheckbox from "../common/Checkbox";
import useOutsideClick from "@/hooks/useOutsideClick";
import axios from "axios";
import { END_POINTS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/lib/func";
import { useSnackbar } from "@/hooks/useSnackbar";
import ROSSnackbar from "../common/ROSSnackbar";
import { Form, Input, Modal, Popover, Tooltip, message } from "antd";
import { useForm } from "antd/es/form/Form";

const SignedDocuments: React.FC<{
  data: IAttachements[];
  documentStatus: any[];
  workspaceName: string;
  event_id: string;
}> = (props) => {
  const { data, documentStatus, event_id } = props;
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [modifiedData, setModifiedData] = useState<IDocumentStatus[]>([]);
  const router = useRouter();

  useEffect(() => {
    // console.log("Data : ", data);
    _filterData();
  }, [data]);

  const _filterData = () => {
    // console.log("ASttachements : ", data);
    // console.log("DocumentStatus : ", documentStatus);
    // console.log("modified Data : ", modifiedData);
    let signedData = data?.filter(
      (item) => item.section_type === "SIGNED_DOCUMENTS_SECTION"
    );

    let temp: any[] = signedData;
    let updatedDate: string = "";
    temp = temp.map((item) => {
      let doc = documentStatus.find((itemX) => itemX.document_id === item.id);
      if (doc) {
        // exist
        if (updatedDate === "") updatedDate = doc.updated_at;
        else if (moment(updatedDate).isBefore(doc?.updated_at))
          updatedDate = doc.updated_at;
        else {
        }
        return {
          document_id: item.id,
          completed: doc.completed,
        };
      } else {
        return {
          document_id: item.id,
          completed: false,
        };
      }
    });
    if (moment(updatedDate).isValid())
      setUpdatedAt(moment(updatedDate).format("MMM DD, YYYY - hh:mmA"));
    else setUpdatedAt("N/A");
    setModifiedData(temp);
  };

  const _saveInfo = async () => {
    // console.log("Item : ", modifiedData, event_id);

    let documents = modifiedData.map((item) => ({
      document_id: item.document_id,
      event_id,
      completed: item.completed,
    }));
    // console.log("Modified Data : ", modifiedData, data.filter(item => item.section_type == "SIGNED_DOCUMENTS_SECTION"));
    // return
    try {
      setLoading(true);

      await axios.post(END_POINTS.UPDATE_SIGNED_DOCUMENTS_STATUS, {
        documents,
      });
      // console.log("ResPonse : ", response);

      router.refresh();
      message.success({
        content: "File status changed successfully"
      })
    } catch (error) {
      message.error({
        content: "File status changing failed"
      })
      console.error("Document Status : ", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("Item : ", modifiedData, documentStatus, data.filter(item => item.section_type == "SIGNED_DOCUMENTS_SECTION"));

  return (
    <div className={styles.container}>
      <div className={styles.mainSec}>
        {(!data.filter(
          (item) => item.section_type === "SIGNED_DOCUMENTS_SECTION"
        ).length ||
          data.filter(
            (item) => item.section_type === "SIGNED_DOCUMENTS_SECTION"
          ).length == 0) && (
          <div className={styles.emptybox}>No Data Found</div>
        )}
        {data
          .filter((item) => item.section_type === "SIGNED_DOCUMENTS_SECTION")
          .map((item) => (
            <SignDocItem
              key={item.id}
              item={item}
              onChange={(val, id) => {
                setModifiedData((pS) =>
                  pS.map((item) => {
                    if (item.document_id == id)
                      return { ...item, completed: val };
                    else return item;
                  })
                );
              }}
              isChecked={
                modifiedData.find((itemX) => itemX.document_id === item.id)
                  ?.completed
              }
              workspace_name={props.workspaceName}
            />
          ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.iconTextCon}>
          <div className={styles.iconContainer}>
            <Image
              src={"/images/icons/tick-circle.svg"}
              alt="thick"
              width={25}
              height={25}
              style={{ borderRadius: 10 }}
            />
          </div>
          {/* Last Saved: Nov 15, 2023 - 11:00PM GST */}
          {updatedAt !== "" && "Last Saved: " + updatedAt}
        </div>
        <div className={styles.saveBtn}>
          <Button
            type="Primary"
            label="Save"
            onClick={_saveInfo}
            loading={loading}
          />
        </div>
      </div>
      {/* <ROSSnackbar isActive={isActive} type={type} message={message} /> */}
    </div>
  );
};

const SignDocItem: React.FC<{
  item: IAttachements;
  onChange: (val: boolean, id: string) => void;
  isChecked: boolean | undefined;
  workspace_name: string;
}> = (props) => {
  const [isChrome, setIsChrome] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [value, setValue] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    value: "",
    description: "",
  });
  const ref = useRef<HTMLDivElement>(null);
  const [form] = useForm();

  useOutsideClick(ref, () => setShowMenu(false));

  useEffect(() => {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      setIsChrome(true);
    }
  }, []);

  const _downloadFile = async () => {
    if (
      isChrome &&
      props.item.url?.includes("inventory") &&
      props.item.file_type === "pdf"
    ) {
      try {
        const response = await axios.get(props.item.url, {
          responseType: "blob",
        });
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "download-file." + props.item.file_type; // You can specify the file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileURL);
      } catch (error) {
        console.log("File download error : ", error);
      }
      return;
    }

    window.open(props.item.url, "_blank");
  };

  const _shareViaEmail = async () => {
    // if (!validateEmail(value || "")) {
    //   setError((pS) => ({ ...pS, value: "Please enter valid email address" }));
    //   return;
    // } else {
    //   setError({
    //     value: "",
    //     description: "",
    //   });
    // }
    // console.log("Share data : ", props.workspace_name, props.item.url, value);

    try {
      const values = await form.validateFields();
      const { email, desc } = values;
      setLoading(true);
      let data = {
        workspace_name: props.workspace_name,
        attachment_url: props.item.url,
        additional_text: desc || "",
        email: email,
      };
      await axios.post(END_POINTS.SHARE_FILE_VIA_EMAIL, data);
      message.success({
        content: "File Shared successfully",
      });
      _handleClose();
    } catch (error) {
      message.error({
        content: 'File sharing failed!'
      })
      console.error("Share File : ", error);
    } finally {
      setLoading(false);
    }
  };

  const _handleClose = () => {
    form.resetFields();
    setOpenShareModal(false);
    // setValue(undefined);
    // setDescription(undefined);
  };

  return (
    <div className={styles.docItemContainer}>
      <div className={styles.mostTopRow}>
        <ROSCheckbox
          id={props.item.id || "1"}
          onChange={(value: boolean) => props.onChange(value, props.item.id)}
          defaultChecked={props.isChecked}
        />

        <div className={styles.fileType}>{props.item.file_type}</div>
      </div>
      <div className={styles.docTopRow}>
        {/* <ROSCheckbox
          id={props.item.id || "1"}
          onChange={(value: boolean) => props.onChange(value, props.item.id)}
          defaultChecked={props.isChecked}
        /> */}
        <div className={styles.externalFileText}>
          <Image
            src={"/images/icons/extensions/other-theme.svg"}
            width={15}
            height={15}
            alt=""
          />
          <span>External File</span>
        </div>

        <div className={styles.menu}>
          <Tooltip title="share via email">
            <Image
              alt="icon"
              width={25}
              height={25}
              onClick={() => {
                setOpenShareModal(true);
              }}
              src="/images/icons/Send_fill.svg"
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.docItem} onClick={() => _downloadFile()}>
        {props.item.file_logo ? (
          <Image src={props.item.file_logo} alt="" width={40} height={40} />
        ) : (
          <Image
            src={"/images/icons/FileText.svg"}
            alt=""
            width={40}
            height={40}
          />
        )}
      </div>
      <div
        className={styles.fileName}
        onClick={() => _downloadFile()}
      >
        {/* {
          // I have used here IIFE (immediately invoked function expression)
          (() => {
            const words = props.item.name.split(" ");
            if (words.length > 2) {
              return words.slice(0, 2).join(" ") + "...";
            } else {
              return props.item.name;
            }
          })()
        } */}

        {props.item.name?.length > 25 ? (
          <Popover content={props.item.name} overlayClassName={styles.itemNameOverlay}>
            {props.item.name?.slice(0, 25) + "..."}
          </Popover>
        ) : (
          props.item.name
        )}
      </div>
      {/* <ROSModal open={false} onClose={_handleClose}>
        <div className={styles.shareModalRoot}>

          <ROSInput
            key={2}
            value={value ? value : ""}
            className={styles.shareInput}
            inputStyle={{
              fontSize: "15px",
            }}
            onChange={(e) => setValue(e.target.value)}
            type="email"
            placeholder="Email"
          />

          <div className={styles.errorMessage}>{error.value}</div>

          <textarea
            key={3}
            className={styles.shareDesc}
            rows={3}
            value={description ? description : ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div className={styles.errorMessage}>{error.description}</div>
          <Button
            label="Share"
            className={styles.shareBtn}
            onClick={_shareViaEmail}
            loading={loading}
          />
        </div>
      </ROSModal> */}

      <Modal
        open={openShareModal}
        onCancel={_handleClose}
        className={styles.shareModal}
        okText={"Share"}
        onOk={() => _shareViaEmail()}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        okButtonProps={{
          loading: loading,
        }}
      >
        <Form
          onFinish={_shareViaEmail}
          form={form}
          className={styles.shareEmailForm}
        >
          <Form.Item>
            <h3>Share File</h3>
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[
              { required: true, message: "Email is required" },
              { transform: (value) => value?.trim() },
              { type: "email", message: "Email is not valid" },
            ]}
          >
            <Input
              type="email"
              placeholder="Email Address"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item name={"desc"}>
            <Input.TextArea
              placeholder="Description"
              rows={3}
              disabled={loading}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function _getExtension(uri: string): string {
  let splitData = uri.split(".");
  let extension = splitData[splitData.length - 1];

  return extension;
}

interface IDocumentStatus {
  id?: string;
  document_id: string;
  completed: boolean;
  updated_at?: string;
}

export default SignedDocuments;
