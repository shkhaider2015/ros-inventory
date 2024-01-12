"use client";
import React, { useLayoutEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RadioButton from "../common/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { updateGuest } from "@/store/features/GuestInfo";
import { updateFormFields } from "@/store/features/formFields";
import { IGuestInfo } from "@/screens/Home";
import moment from "moment";
import ROSInput from "../common/ROSInput";

const ExpectedGuest: React.FC<{ initialData: IGuestInfo }> = (props) => {
  const guestInfo = useSelector((state: any) => state.guestInfo);
  const formFields = useSelector((state: any) => state.formFields);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (props.initialData) {
      let { checkin_at_door, expected_guest_count } = props.initialData;

      if (typeof checkin_at_door !== "number") checkin_at_door = 0;
      if (typeof expected_guest_count !== "number") expected_guest_count = 0;

      dispatch(
        updateGuest({
          checkin_at_door,
          expected_guest_count,
        })
      );
    }
  }, [props.initialData]);

  console.log("Props init: ", guestInfo.expected_guest_count);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Expected Guest Count</div>
      {/* <div className={styles.inputBox}>
        <div className={styles.count}>{guestInfo.expected_guest_count}</div>
        <CounterButton
          minValue={1}
          maxValue={100}
          value={props.initialData.expected_guest_count ? props.initialData.expected_guest_count  / 10 : 10}
          onChange={(value) => {
            let val = value * 10;
            dispatch(updateGuest({ expected_guest_count: val }));
            // setGuestCount(val);
          }}
        />
      </div> */}
      {/* <div className={styles.inputBox}> */}
      <ROSInput
        value={
          guestInfo.expected_guest_count?.toString().length > 1
            ? guestInfo.expected_guest_count?.toString().replace(/^0+/, "")
            : guestInfo.expected_guest_count
        }
        className={styles.inputCon}
        type="number"
        onChange={(e) => {
          let val = Number(e.target.value);
          if (val < 0) val = 0;
          dispatch(updateGuest({ expected_guest_count: val }));
          if (!formFields.isFormFieldsChanged) {
            dispatch(updateFormFields({ isFormFieldsChanged: true }));
          }
        }}
      />
      {/* </div> */}
      <div className={styles.confermText}>
        Please confirm if you have someone to check in your guests
      </div>
      <div className={styles.radioGroup}>
        <div className={styles.btnCon}>
          <RadioButton
            name="yes"
            label="Yes"
            value={guestInfo.checkin_at_door === 1}
            onChange={(val) => {
              dispatch(updateGuest({ checkin_at_door: 1 }));
              if (!formFields.isFormFieldsChanged) {
                dispatch(updateFormFields({ isFormFieldsChanged: true }));
              }
              // if (val) {
              //   setIsYes("YES");
              //   // dispatch(updateGuest({ checkin_at_door: 1 }));
              // } else {
              //   setIsYes("NO");
              // }
            }}
          />
        </div>
        <div className={styles.btnCon}>
          <RadioButton
            name="no"
            label="No"
            value={guestInfo.checkin_at_door === 0}
            onChange={(val) => {
              dispatch(updateGuest({ checkin_at_door: 0 }));
              if (!formFields.isFormFieldsChanged) {
                dispatch(updateFormFields({ isFormFieldsChanged: true }));
              }
              // if (val) {
              //   setIsYes("NO");
              //   // dispatch(updateGuest({ checkin_at_door: 0 }));
              // } else {
              //   setIsYes("YES");
              // }
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
          Last Saved:{" "}
          {moment(props.initialData.updated_at).format("MMM DD, YYYY - hh:mmA")}
        </div>
        <div className={styles.saveBtn}>
          {/* <Button type="Primary" label="Save" onClick={_saveInfo} /> */}
        </div>
      </div>
    </div>
  );
};

export default ExpectedGuest;
