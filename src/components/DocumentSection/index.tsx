"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import TextEditor from "../TextEditor";
import { IAttachements, IInventoryItem } from "@/screens/Home";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import ROSModal from "../common/ROSModal";

const DocumentSection = (props: {
  item: IInventoryItem | undefined;
  attachements: IAttachements[];
  section_type?: string;
  section_title: string;
  event_id: string;
  workspace_id: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const router = useRouter();

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

  const _handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
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
        description: file.name,
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

  // console.log("File ", props.attachements);

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
          <div className={styles.title}>
            {props.item?.name || props.section_title}
          </div>
          <div className={styles.desc}>
            <TextEditor value={props.item?.description} isReadOnly={true} />
          </div>
          <div className={styles.btnContainer}>
            {props.item?.description && (
              <div
                className={styles.thirdRow}
                onClick={() => setShowDetails(true)}
              >
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
        </div>

        {/* 
          <div className={styles.descContainer}>
          </div> 
        */}
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
        <label className={styles.btn} htmlFor={`upload-${props.section_type}`}>
          {loading ? (
            <Loader />
          ) : (
            <input
              type="file"
              name="upload-file"
              id={`upload-${props.section_type}`}
              onChange={_handleUpload}
            />
          )}
          + Upload Document
        </label>
      </div>
      <ROSModal open={showDetails} onClose={() => setShowDetails(false)}>
        <div className={styles.sectionModalContainer}>
          {/* <div className={styles.dsModalTitle} >Title</div> */}
          <div className={styles.sectionModalContent}>
            <TextEditor value={props.item?.description} isReadOnly={true} />
          </div>
        </div>
      </ROSModal>
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
}) => {
  const [isChrome, setIsChrome] = useState<boolean>(false);

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

  // console.log("FileType ", file_type);

  return (
    <div className={styles.docContainer}>
      <div className={styles.leftCol}>
        <div className={styles.docIconContainer}>
          {file_logo ? (
            <Image src={file_logo} alt="" width={20} height={20} />
          ) : (
            <Image
              src={"/images/icons/FileText.svg"}
              alt=""
              width={20}
              height={20}
            />
          )}
          {/* <Image
            src={"/images/icons/FileText.svg"}
            alt=""
            width={20}
            height={20}
          /> */}
        </div>

        <div className={styles.textCon}>
          <div className={styles.docTitle}>{name}</div>
          <div className={styles.decDesc}>{description}</div>
        </div>
      </div>
      <div className={styles.rightCol}>
        {/* {uploaded_via === "CLIENT" && (
          <div className={styles.docIconContainer} onClick={() => {}}>
            <Image
              src={"/images/icons/delete.svg"}
              alt="import"
              width={22}
              height={22}
            />
          </div>
        )} */}
        <div className={styles.docIconContainer} onClick={_downloadFile}>
          <Image
            src={"/images/icons/Import.svg"}
            alt="import"
            width={22}
            height={22}
          />
        </div>
      </div>
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
