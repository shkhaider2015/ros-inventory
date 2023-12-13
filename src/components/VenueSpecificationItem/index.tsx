"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import React, { useState } from "react";
import TextEditor from "../TextEditor";

const IconArray:string[] = [
  '/public/'
]

const VenueSpecificationItem: React.FC<IVenueItem> = (props) => {
  const { icon_url, name, description } = props;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <div className={styles.iconContainer}>
          <Image src={icon_url || ""} alt="icon" width={22} height={22} />
        </div>
        <div className={styles.title}>{name}</div>
      </div>
      <div className={`${styles.secondRow} ${showDetails ? styles.scrollable : ""} `}>
        <TextEditor value={description} isReadOnly />
      </div>
      <div
        className={styles.thirdRow}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className={styles.title}>{showDetails ? "Hide" : "View"} Details</div>
        <Image
          src={"/images/icons/arrow-up.svg"}
          alt="arrow"
          width={22}
          height={22}
        />
      </div>
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
  type: "INVENTORY_MENU" | "VENUE_SPEC" | "KITCHEN_SUPPLY";
  workspace_id?: string;
  updated_at?: string;
}

export default VenueSpecificationItem;
