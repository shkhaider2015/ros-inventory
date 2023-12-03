import Image from "next/image";
import styles from "./styles.module.css";
import React from "react";

const VenueSpecificationItem:React.FC<IVenueItem> = (props) => {
    const { url, title, desc } = props;

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <div className={styles.iconContainer}>
          <Image
            src={url}
            alt="icon"
            width={22}
            height={22}
          />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.secondRow}>{desc}</div>
      <div className={styles.thirdRow}>
        <div className={styles.title}>View Details</div>
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
    url: string;
    title: string;
    desc: string
  }

export default VenueSpecificationItem;
