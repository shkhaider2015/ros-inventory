"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import moment from "moment";
import Button from "../common/Button";
import { IAttachements } from "@/screens/Home";
import ROSCheckbox from "../common/Checkbox";
import useOutsideClick from "@/hooks/useOutsideClick";

const SignedDocuments: React.FC<{ data: IAttachements[] }> = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState(false);
  const [modifiedData, setModifiedData] = useState<any[]>([]);

  useEffect(() => {
    console.log("Data : ", data);
    setModifiedData(data.filter(item => item.section_type === "SIGNED_DOCUMENTS_SECTION").map((item) => ({ id: item.id, checked: false })));
  }, [data]);

  const _saveInfo = () => {};

  console.log("Item : ", modifiedData);
  
  return (
    <div className={styles.container}>
      <div className={styles.mainSec}>
        {data
          .filter((item) => item.section_type === "SIGNED_DOCUMENTS_SECTION")
          .map((item) => (
            <SignDocItem key={item.id} item={item} onChange={(val, id) => {
                setModifiedData(pS => pS.map(item => {
                    if(item.id == id) return {...item, checked: val}
                    else return item
                }))
            }} />
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
          Last Saved: {moment().format("MMM DD, YYYY - hh:mmA")}
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
}> = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setShowMenu(false));

  return (
    <div className={styles.docItemContainer}>
      <div className={styles.docTopRow}>
        <ROSCheckbox
          id={props.item.id || "1"}
          onChange={(value: boolean) => props.onChange(value, props.item.id)}
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
            {Array.from(["Share via Email"]).map((item) => (
              <div
                className={styles.menuItem}
                onClick={() => setShowMenu(false)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.docItem}>
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
      <div className={styles.fileName}>
        {props.item.name.length > 15
          ? "..." + props.item.name.slice(-15)
          : props.item.name}
      </div>
    </div>
  );
};

function _getExtension(uri: string): string {
  let splitData = uri.split(".");
  let extension = splitData[splitData.length - 1];

  return extension;
}

export default SignedDocuments;
