"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import moment from "moment";
import Button from "../common/Button";
import { IAttachements } from "@/screens/Home";
import ROSCheckbox from "../common/Checkbox";
import useOutsideClick from "@/hooks/useOutsideClick";
import axios from "axios";
import ROSModal from "../common/ROSModal";
import ROSInput from "../common/ROSInput";
import { END_POINTS } from "@/lib/constants";
import { useRouter } from "next/navigation";

const SignedDocuments: React.FC<{
  data: IAttachements[];
  documentStatus: any[];
  event_id: string;
}> = (props) => {
  const { data, documentStatus, event_id } = props;
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [modifiedData, setModifiedData] = useState<IDocumentStatus[]>([]);
  const router = useRouter()

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
    if (
      signedData.length > 0 &&
      (!documentStatus.length || documentStatus.length <= 0)
    ) {
      // let temp:IDocumentStatus[] = signedData.map(item => ({ document_id: item?.id, completed: false }))
      // setModifiedData(temp)
    } else {
      let updatedAt:string = moment(documentStatus?.[0]?.updated_at).format("MMM DD, YYYY - hh:mmA")
      setUpdatedAt(updatedAt)
      // setModifiedData(documentStatus);
    }
    let temp:any[] = signedData;
    temp = temp.map(item =>  {
      let doc = documentStatus.find(itemX => itemX.document_id === item.id)
      if(doc) {
        // exist
        return {
          document_id: item.id,
          completed: doc.completed
        }
      } else {
        return {
          document_id: item.id,
          completed: false
        }
      }
    })
    setModifiedData(temp);
  };

  const _saveInfo = async () => {
    // console.log("Item : ", modifiedData, event_id);
    let documents = modifiedData.map((item) => ({ document_id: item.document_id, event_id, completed: item.completed }));
    // console.log("Modified Data : ", modifiedData, data.filter(item => item.section_type == "SIGNED_DOCUMENTS_SECTION"));
    // return
    try {
      setLoading(true);

      const response = await axios.post(
        END_POINTS.UPDATE_SIGNED_DOCUMENTS_STATUS,
        { documents }
      );
      // console.log("ResPonse : ", response);
      router.refresh()
    } catch (error) {
      console.error("Document Status : ", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("Item : ", modifiedData, documentStatus, data.filter(item => item.section_type == "SIGNED_DOCUMENTS_SECTION"));

  return (
    <div className={styles.container}>
      <div className={styles.mainSec}>
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
              isChecked={modifiedData.find(itemX => itemX.document_id === item.id  )?.completed}
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
          Last Saved: {updatedAt}
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
    </div>
  );
};

const SignDocItem: React.FC<{
  item: IAttachements;
  onChange: (val: boolean, id: string) => void;
  isChecked: boolean | undefined
}> = (props) => {
  const [isChrome, setIsChrome] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setShowMenu(false));

  useEffect(() => {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      setIsChrome(true);
    }
  }, []);

  const _downloadFile = async () => {
    if (isChrome && props.item.url?.includes('inventory') && props.item.file_type === "pdf") {
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

  return (
    <div className={styles.docItemContainer}>
      <div className={styles.docTopRow}>
        <ROSCheckbox
          id={props.item.id || "1"}
          onChange={(value: boolean) => props.onChange(value, props.item.id)}
          defaultChecked={props.isChecked}
        />
        <div className={styles.menu}>
          <div className={styles.menuLogo} onClick={() => setShowMenu(true)}>
            <Image
              width={20}
              height={20}
              src={"/images/icons/Meatballs_menu.svg"}
              alt=""
            />
          </div>
          <div
            ref={ref}
            className={`${styles.menuItemCon} ${
              showMenu ? styles.visibleMenu : ""
            }`}
          >
            {Array.from(["Share via Email"]).map((item, index) => (
              <div
                key={index}
                className={styles.menuItem}
                onClick={() => setShowMenu(false)}
              >
                {item}
              </div>
            ))}
          </div>
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
      <div className={styles.fileName} onClick={() => _downloadFile()}>
        {props.item.name.length > 15
          ? "..." + props.item.name.slice(-15)
          : props.item.name}
      </div>
      <ROSModal open={openShareModal} onClose={() => setOpenShareModal(false)}>
        <div>
          <ROSInput />
          <Button label="Share" />
        </div>
      </ROSModal>
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
