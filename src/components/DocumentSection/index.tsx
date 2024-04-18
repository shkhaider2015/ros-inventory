"use client";
import Image from "next/image";
import styles from "./DocumentSection.module.css";
import TextEditor from "../TextEditor";
import { IAttachements, IInventoryItem } from "@/screens/Home";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import ROSModal from "../common/ROSModal";
import useModal from "@/hooks/useModal";
import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { END_POINTS } from "@/lib/constants";
import FilePreview from "../FilePreview";
import Button from "../common/Button";

const DocumentSection = (props: {
  item: IInventoryItem | undefined;
  attachements: IAttachements[];
  section_type?: string;
  section_title: string;
  event_id: string;
  workspace_id: string;
  isOnlyDocs?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [openAttachmentsModal, setOpenAttachmentsModal] =
    useState<boolean>(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [fileDescription, setFileDescription] = useState<string>("");

  const [form] = useForm();

  const router = useRouter();

  const _addAttachment = async () => {
    try {
      setLoading(true);
      if (attachments.length > 0) {
        const response = await _handleUpload(attachments[0]);

        _handleCloseAttachmentModal();
      } else {
        message.error({
          content: "Please upload a file",
        });
      }
    } catch (error: any) {
      message.error({
        content: "Attachment Uploading failed",
      });
      console.log("Attachment Upload : ", error);
    } finally {
      setLoading(false);
    }
  };

  const _handleCloseAttachmentModal = () => {
    form.resetFields();
    setAttachments([]);
    setOpenAttachmentsModal(false);
  };

  const _handleFileChange = (event: any) => {
    const newAttachments = Array.from(event.target.files);

    if (event.target.files[0].size > 1 * 1024 * 1024) {
      message.error({
        content: "Attachment Uploading failed, file size exceeds 10 MB",
      });
      return;
    }

    if (newAttachments.length !== 0) setAttachments(newAttachments);
  };

  const _handleFileDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFileDescription(event.target.value);
  };

  const _uploadFileDataToServer = async (
    fileData: IUploadData
  ): Promise<any> => {
    let mainURL =
      "https://myapi.runofshowapp.com/api/inventory/uploadFileClient";
    if (!props.workspace_id) return Promise.reject("Workspace_id in undefined");
    if (!fileData.section_type)
      return Promise.reject("section_type in undefined");
    try {
      let res: AxiosResponse<{ url: string }> = await axios.post(
        mainURL,
        fileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return Promise.resolve(res.data.url);
    } catch (error: any) {
      console.log("Error : ", error);

      let err = null;
      if (error instanceof AxiosError) err = error.message;
      else err = error;
      return Promise.reject(err);
    }
  };

  const _uploadFileToS3Bucket = async (
    file: File,
    url: string
  ): Promise<any> => {
    if (!file) return Promise.reject("File not found");
    if (!url) return Promise.reject("S3 URL not found");
    try {
      let res = axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("File Uploaded Successfully");
      return res;
    } catch (error) {
      console.error("File Upload error : ", error);
      return Promise.reject("Upload file to s3 bucket failed");
    }
  };

  const _handleUpload = async (attachment: File) => {
    let file = attachment;
    let workspaceId = props.workspace_id;
    let sectionType = props.section_type;

    if (!file) return;
    if (!props.event_id) {
      console.log("Event Id not found");
      return;
    }
    try {
      setLoading(true);
      let data: IUploadData = {
        name: file.name,
        description: fileDescription,
        workspace_id: workspaceId,
        file_name: `inventory-${workspaceId}-${Date.now()}-file`,
        file_type: _getExtension(file.name),
        section_type: sectionType,
        event_id: props.event_id,
      };
      let s3URL = await _uploadFileDataToServer(data);
      await _uploadFileToS3Bucket(file, s3URL);
      router.refresh();
    } catch (error) {
      console.error("_handleUpload Error : ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // console.log(`${props.item} - Files : `, props.attachements);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.iconColumn}>
          <div className={styles.iconContainer}>
            <Image
              src={"/images/icons/HandHeart.svg"}
              alt=""
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className={styles.textColumn}>
          <div className={styles.desc}>
            <TextEditor value={props.item?.description} isReadOnly={true} />
            <div className={styles.descShadow} />
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        {props.item?.description && (
          <div className={styles.thirdRow} onClick={() => setShowDetails(true)}>
            <div className={styles.title}>View Details</div>
            <Image
              src={"/images/icons/arrow-up.svg"}
              alt="arrow"
              width={22}
              height={22}
            />
          </div>
        )}
      </div>
      <div className={styles.hrLine} />
      <div className={styles.docsContainer}>
        <div className={styles.docsTitle}>
          {
            props.attachements.filter(
              (item) => item.section_type === props.item?.type
            ).length
          }{" "}
          DOCUMENTS UPLOADED
        </div>
        {props.attachements
          .filter((item) => item.section_type === props.item?.type)
          .map((item) => (
            <DocItem {...item} key={item.id} />
          ))}
      </div>
      <div className={styles.btnCon}>
        <Button
          type="Primary"
          className={styles.btn}
          label="+ Upload Attachments"
          onClick={() => {
            setOpenAttachmentsModal(true);
          }}
        />
      </div>
      <ROSModal open={showDetails} onClose={() => setShowDetails(false)}>
        <div className={styles.sectionModalContainer}>
          {/* <div className={styles.dsModalTitle} >Title</div> */}
          <div className={styles.sectionModalContent}>
            <TextEditor value={props.item?.description} isReadOnly={true} />
          </div>
        </div>
      </ROSModal>

      <Modal
        open={openAttachmentsModal}
        onCancel={_handleCloseAttachmentModal}
        className={styles.shareModal}
        okText={"Add"}
        onOk={() => _addAttachment()}
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
          onFinish={() => _addAttachment()}
          form={form}
          className={styles.shareEmailForm}
        >
          <Form.Item>
            <h3>Add an Attachment</h3>
          </Form.Item>

          <Form.Item>
            <div className={styles.btnCon}>
              <label
                className={styles.btn}
                htmlFor={`upload-${props.section_type}`}
              >
                {loading ? (
                  <Loader theme="DARK" />
                ) : (
                  <input
                    type="file"
                    name="upload-file"
                    id={`upload-${props.section_type}`}
                    style={{ display: "none" }}
                    onChange={(event) => _handleFileChange(event)}
                  />
                )}
                + Upload Document
              </label>
            </div>
            <div className={styles.docsContainer}>
              <div className={styles.docsTitle}>
                {attachments.length} DOCUMENTS SELECTED
              </div>
              {attachments.map((item) => {
                return (
                  <div key={item.name} className={styles.docContainer}>
                    <div className={styles.leftCol}>
                      <div className={styles.icon_column}>
                        <div className={styles.docIconContainer}>
                          {
                            /* {file_logo ? (
                            <Image
                              src={file_logo}
                              alt=""
                              width={25}
                              height={25}
                            />
                          ) : ( */
                            <Image
                              src={"/images/icons/FileText.svg"}
                              alt=""
                              width={25}
                              height={25}
                            />
                          }
                        </div>
                      </div>

                      <div className={styles.textCon}>
                        <div className={styles.docTitle}>{item.name}</div>
                      </div>
                    </div>
                    <div className={styles.rightCol}>
                      <div
                        className={styles.docIconContainerOp}
                        onClick={() => {
                          // console.log(item.name, "item name");
                          // const itemsAfterDeletion = attachments.filter(
                          //   (itemTofilter) => {
                          //     console.log(itemTofilter.name);
                          //     return item.name !== itemTofilter.name;
                          //   }
                          // );
                          setAttachments([]);
                        }}
                      >
                        <Image
                          src={"/images/icons/delete.svg"}
                          alt="import"
                          width={22}
                          height={22}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Form.Item>

          <Form.Item name={"desc"}>
            <Input.TextArea
              placeholder="Description"
              rows={3}
              disabled={loading}
              onChange={(event) => _handleFileDescriptionChange(event)}
              // rules={[
              //   { required: true, message: "Description is required" },
              //   { transform: (value: string) => value?.trim() },
              //   // { type: "text", message: "Email is not"},
              // ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const DocItem: React.FC<IAttachements> = ({
  name,
  description,
  url,
  file_logo,
  file_type,
  uploaded_via,
  id,
  workspace_id,
}) => {
  const [isChrome, setIsChrome] = useState<boolean>(false);
  const router = useRouter();
  const { open } = useModal();
  const [form] = useForm();
  const [openShareModal, setOpenShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      setIsChrome(true);
    }
  }, []);

  const _downloadFile = async () => {
    if (isChrome && file_type === "pdf") {
      try {
        const response = await axios.get(url, { responseType: "blob" });
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "download-file." + file_type; // You can specify the file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileURL);
      } catch (error) {
        console.log("File download error : ", error);
      }
      return;
    }

    window.open(url, "_blank");
  };

  const _deleteClientFile = async (id: string) => {
    if (!id) return;
    try {
      let URL = "https://myapi.runofshowapp.com/api/inventory/deleteFileClient";
      await axios.post(
        URL,
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.refresh();
    } catch (error) {
      console.log("Client Documnent Delete error : ", error);
    }
  };

  const _shareViaEmail = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { email, desc } = values;

      console.log("Values ", values);
      if (!email) throw "Email is not found";

      let data = {
        workspace_name: "workspace",
        attachment_url: url,
        additional_text: desc || "",
        email: email,
      };

      await axios.post(END_POINTS.SHARE_FILE_VIA_EMAIL, data);
      message.success({
        content: "File shared successfully",
      });
      _handleCloseShareModal();
    } catch (error) {
      message.error({
        content: "File sharing failed",
      });
      console.log("Share Via Email : ", error);
    } finally {
      setLoading(false);
    }
  };

  const _handleCloseShareModal = () => {
    form.resetFields();
    setOpenShareModal(false);
  };
  // console.log("FileType ", file_type);

  return (
    <div className={styles.docContainer}>
      <div className={styles.leftCol}>
        <div className={styles.icon_column}>
          <div
            className={styles.docIconContainer}
            onClick={() => {
              const fileExtension = [
                "pdf",
                "doc",
                "docx",
                "xlsx",
                "xls",
                "txt",
              ];
              if (!fileExtension.includes(file_type)) {
                setOpenModal(true);
              }
            }}
          >
            {file_logo ? (
              <Image src={file_logo} alt="" width={25} height={25} />
            ) : (
              <Image
                src={"/images/icons/FileText.svg"}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
        </div>
      </div>
      <FilePreview
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        fileUrl={url}
        file_type={file_type}
      />

      <div className={styles.textCon}>
        <div className={styles.docTitle}>{name}</div>
        <div className={styles.decDesc}>{description}</div>
      </div>

      <div className={styles.rightCol}>
        <div
          className={styles.docIconContainerOp}
          onClick={() => setOpenShareModal(true)}
        >
          <Image
            src={"/images/icons/Send_fill.svg"}
            alt="import"
            width={22}
            height={22}
          />
        </div>
        {uploaded_via === "CLIENT" && (
          <div
            className={styles.docIconContainerOp}
            onClick={() =>
              open({
                message: "Are you sure you want to delete this Document?",
                onOk: async () => _deleteClientFile(id),
              })
            }
          >
            <Image
              src={"/images/icons/delete.svg"}
              alt="import"
              width={22}
              height={22}
            />
          </div>
        )}
        <div className={styles.docIconContainerOp} onClick={_downloadFile}>
          <Image
            src={"/images/icons/Import.svg"}
            alt="import"
            width={22}
            height={22}
          />
        </div>
      </div>
      <Modal
        open={openShareModal}
        onCancel={_handleCloseShareModal}
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

interface IUploadData {
  name: string;
  file_type: string;
  file_name: string;
  workspace_id: string | undefined;
  description: string;
  section_type: string | undefined;
  event_id: string | undefined;
}

export default DocumentSection;
