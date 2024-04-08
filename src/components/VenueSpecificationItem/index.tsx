"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import React, { useState } from "react";
import TextEditor from "../TextEditor";
import { Modal } from "antd";

const IconArray: string[] = ["/public/"];

const VenueSpecificationItem: React.FC<IVenueItem> = (props) => {
  const { icon_url, name, description } = props;
  const [showDetails, setShowDetails] = useState(false);
console.log("PPPP      :::   ", showDetails)
  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <div className={styles.iconContainer}>
          <Image src={icon_url || ""} alt="icon" width={22} height={22} />
        </div>
        <div className={styles.title}>{name}</div>
      </div>
      <div className={`${styles.secondRow}`}>
        <TextEditor value={description} isReadOnly />
      </div>
      <div className={styles.VSDescShadow} />
      <div className={styles.thirdRow} onClick={() => setShowDetails(true)}>
        <div className={styles.title}>View Details</div>
        <Image
          src={"/images/icons/arrow-up.svg"}
          alt="arrow"
          width={22}
          height={22}
        />
      </div>

      <Modal open={showDetails} onCancel={() => setShowDetails(false)} footer={null}>
        <div className={styles.modalContainer}>
          <div className={styles.headSec}>
            <div className={styles.iconContainer}>
              <Image src={icon_url || ""} alt="icon" width={22} height={22} />
            </div>
            <div className={styles.title}>{name}</div>
          </div>
          <div className={styles.editorText}>
            <TextEditor value={description} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

interface IVenueItem {
  description: string;
  icon_url: string | undefined;
  id: string;
  name: string;
  quantity: number;
  rental_price: number;
  type:
    | "INVENTORY_MENU"
    | "VENUE_SPEC"
    | "KITCHEN_SUPPLY"
    | "ABOUT_THE_VENUE"
    | "INSURANCE_REQUIREMENTS"
    | "FOOD_AND_BEVERAGE"
    | "MISC"
    | "client_planner";
  workspace_id?: string;
  updated_at?: string;
}

export default VenueSpecificationItem;
