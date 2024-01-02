"use client";
import React, { useLayoutEffect, useState } from "react";
import CounterButton from "../common/CounterButton";
import styles from "./styles.module.css";
import Image from "next/image";
import RadioButton from "../common/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { updateGuest } from "@/store/features/GuestInfo";
import Button from "../common/Button";
import { IGuestInfo } from "@/screens/Home";
import moment from "moment";

const ExpectedGuest:React.FC<{initialData: IGuestInfo}> = (props) => {
  const guestInfo = useSelector((state: any) => state.guestInfo);
  const [guestCount, setGuestCount] = useState<number>(10);
  const [isYes, setIsYes] = useState<"YES" | "NO" | undefined>();

  const dispatch = useDispatch();

  // console.log("Guest Info in expected : ", props.initialData);

  useLayoutEffect(() => {
    if(guestInfo) {
      setGuestCount(guestInfo.expected_guest_count)
      setIsYes(pS => guestInfo.checkin_at_door === 1 ? "YES" : "NO" )
    }
  }, [guestInfo])

  useLayoutEffect(() => {
    if(props.initialData){
      let {checkin_at_door, expected_guest_count} = props.initialData;

      if(typeof checkin_at_door !== 'number') checkin_at_door = 0;
      if(typeof expected_guest_count !== "number") expected_guest_count = 0;

      dispatch(updateGuest({
        checkin_at_door,
        expected_guest_count
      }))
    }
  }, [props.initialData])

  const _saveInfo = () => {
    let obj = {
      expected_guest_count: guestCount,
      checkin_at_door: isYes ? 1 : 0,
    };

    dispatch(updateGuest(obj));
  };
// console.log("Props init: ", props.initialData, guestInfo);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Expected Guest Count</div>
      <div className={styles.inputBox}>
        <div className={styles.count}>{guestCount}</div>
        <CounterButton
          minValue={1}
          maxValue={100}
          value={props.initialData.expected_guest_count ? props.initialData.expected_guest_count  / 10 : 10}
          onChange={(value) => {
            let val = value * 10;
            // dispatch(updateGuest({ expected_guest_count: val }));
            setGuestCount(val);
          }}
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
            onChange={(val) => {
              if (val) {
                setIsYes("YES");
                // dispatch(updateGuest({ checkin_at_door: 1 }));
              } else {
                setIsYes("NO");
              }
            }}
          />
        </div>
        <div className={styles.btnCon}>
          <RadioButton
            name="no"
            label="No"
            value={isYes === "NO"}
            onChange={(val) => {
              if (val) {
                setIsYes("NO");
                // dispatch(updateGuest({ checkin_at_door: 0 }));
              } else {
                setIsYes("YES");
              }
            }}
          />
        </div>
      </div>
      <div className={styles.bottomRow}>
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
          Last Saved: {moment(props.initialData.updated_at).format('MMM DD, YYYY - hh:mmA')}
        </div>
        <div className={styles.saveBtn}>
          <Button type="Primary" label="Save" onClick={_saveInfo} />
        </div>
      </div>
    </div>
  );
};

export default ExpectedGuest;
