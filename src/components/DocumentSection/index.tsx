"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import TextEditor from "../TextEditor";
import Button from "../common/Button";
import { IAttachements, IInventoryItem } from "@/screens/Home";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import Loader from "../common/Loader";

const DocumentSection = (props: {
  item: IInventoryItem | undefined;
  attachements: IAttachements[];
  section_type?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const _uploadFileToServer = async (fileData: IUploadData): Promise<any> => {
    let URL = "https://myapi.runofshowapp.com/api/inventory/uploadFileClient";
    if(!fileData.workspace_id) return Promise.reject("Workspace_id in undefined")
    if(!fileData.section_type) return Promise.reject("section_type in undefined")
    try {
      let res: AxiosResponse<{ url: string }> = await axios.post(URL, fileData, {
        headers: {
          "Content-Type": fileData.file_type,
        },
      });

      return Promise.resolve(res.data.url);
    } catch (error: any) {
      console.log("Error : ", error);

      let err = null;
      if (error instanceof AxiosError) err = error.message;
      else err = error;
      return Promise.reject(err);
    }
  };

  const _handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    let workspaceId = props.item?.workspace_id
    let sectionType = props.item?.type;

    if (!file) return;
    try {
      setLoading(true);
      let data:IUploadData = {
        name: file.name,
        description: file.name,
        workspace_id: workspaceId,
        file_name: `inventory-${workspaceId}-${Date.now()}-file`,
        file_type: file.type,
        section_type: sectionType
      }
      let s3URL = await _uploadFileToServer(data);
      console.log("S3URL : ", s3URL);
    } catch (error) {
      console.error("_handleUpload Error : ", error);
    } finally {
      setLoading(false);
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
            {props.item?.name || props.section_type}
          </div>
          <div className={styles.desc}>
            <TextEditor value={props.item?.description} isReadOnly={true} />
          </div>
        </div>

        {/* <div className={styles.descContainer}>
          
        </div> */}
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
        <label className={styles.btn} htmlFor="upload-file">
          {loading ? (
            <Loader />
          ) : (
            <input
              type="file"
              name="upload-file"
              id="upload-file"
              onChange={_handleUpload}
            />
          )}
          + Upload Document
        </label>
      </div>
    </div>
  );
};

const DocItem: React.FC<IAttachements> = ({
  name,
  description,
  url,
  file_logo,
}) => {
  const _downloadFile = () => {
    window.open(url, "_blank");
  };

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

interface IUploadData {
  name: string;
  file_type: string;
  file_name: string;
  workspace_id: string | undefined;
  description: string;
  section_type: string | undefined;
}

export default DocumentSection;
