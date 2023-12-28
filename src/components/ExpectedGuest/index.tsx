"use client";
import React, { useState } from "react";
import CounterButton from "../common/CounterButton";
import styles from "./styles.module.css";
import Image from "next/image";
import RadioButton from "../common/RadioButton";

const ExpectedGuest = () => {
  const [guestCount, setGuestCount] = useState<number>(10);
  const [isYes, setIsYes] = useState<"YES" | "NO" | undefined>();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Expected Guest Count</div>
      <div className={styles.inputBox}>
        <div className={styles.count}>{guestCount}</div>
        <CounterButton
          minValue={1}
          maxValue={100}
          onChange={(value) => setGuestCount(value * 10)}
        />
      </div>
      <div className={styles.confermText}>
        Please confirm if you have someone to check in your guests
      </div>
      <div className={styles.radioGroup}>
        <div className={styles.btnCon}>
          <RadioButton
            name="yes"
            label="Yes"
            value={isYes === "YES"}
            onChange={(val) => (val ? setIsYes("YES") : setIsYes("NO"))}
          />
        </div>
        <div className={styles.btnCon}>
          <RadioButton
            name="no"
            label="No"
            value={isYes === "NO"}
            onChange={(val) => (val ? setIsYes("NO") : setIsYes("YES"))}
          />
        </div>
      </div>
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
        Last Saved: Nov 15, 2023 - 11:00PM GST
      </div>
    </div>
  );
};

export default ExpectedGuest;
