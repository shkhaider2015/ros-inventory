"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import RadioButton from "../common/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { updateGuest } from "@/store/features/GuestInfo";
import { updateFormFields } from "@/store/features/formFields";
import { IGuestInfo } from "@/screens/Home";
import moment, { Moment } from "moment";
import ROSInput from "../common/ROSInput";
import Button from "../common/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadInAndOut from "../LoadInAndOut";
import dayjs, { Dayjs } from "dayjs";
import TextEditor from "../TextEditor";
import ROSModal from "../common/ROSModal";
import { Modal, message } from "antd";
import { END_POINTS } from "@/lib/constants";

const ExpectedGuest: React.FC<{
  initialData: IGuestInfo;
  event_id: string;
  specialInstructions: any;
}> = (props) => {
  const [guestCount, setGuestCount] = useState<number>(0);
  const [isConfirm, setIsConfirm] = useState<"1" | "0" | "2">("2");
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const guestInfo = useSelector((state: any) => state.guestInfo);
  const formFields = useSelector((state: any) => state.formFields);
  // some test
  const [loadInTime, setLoadInTime] = useState<Dayjs | null>(
    props.initialData.load_in_time
      ? dayjs(props.initialData.load_in_time)
      : null
  );
  const [loadOutTime, setLoadOutTime] = useState<Dayjs | null>(
    props.initialData.load_out_time
      ? dayjs(props.initialData.load_out_time)
      : null
  );

  const router = useRouter();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (props.initialData) {
      let { checkin_at_door, expected_guest_count } = props.initialData;

      if (typeof checkin_at_door !== "number") checkin_at_door = 0;
      if (typeof expected_guest_count !== "number") expected_guest_count = 0;

      setGuestCount(expected_guest_count);
      setIsConfirm(() => {
        if (checkin_at_door === 0) return "0";
        if (checkin_at_door === 1) return "1";
        else return "2";
      });
      // dispatch(
      //   updateGuest({
      //     checkin_at_door,
      //     expected_guest_count,
      //   })
      // );
    }
  }, [props.initialData]);

  const _saveInfo = async () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedLoadInTime = loadInTime
      ? loadInTime.format("YYYY-MM-DDTHH:mm:ss.SSSSSS") + `[${userTimezone}]`
      : null;
    const formattedLoadOutTime = loadOutTime
      ? loadOutTime.format("YYYY-MM-DDTHH:mm:ss.SSSSSS") + `[${userTimezone}]`
      : null;

    try {
      setLoading(true);
      await axios
        .post(
          END_POINTS.SAVE_CHECKOUT_ITEMS,
          {
            expected_guest_count: guestCount,
            checkin_at_door: Number(isConfirm),
            event_id: props.event_id,
            load_in_time: formattedLoadInTime,
            load_out_time: formattedLoadOutTime,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
      if (formFields.isFormFieldsChanged) {
        dispatch(updateFormFields({ isFormFieldsChanged: false }));
      }
      router.refresh();
      message.success({
        content: "Data saved successfully"
      })
    } catch (error) {
      console.log("Save api error : ", error);
      message.error({
        content: "Something went wrong"
      })
    } finally {
      setLoading(false);
    }
  };

  // console.log("Props init: ", props.initialData);

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
        // value={parseInt(guestInfo.expected_guest_count).toString()
        // guestInfo.expected_guest_count?.toString().length > 1
        //   ? guestInfo.expected_guest_count?.toString().replace(/^0+/, "")
        //   : guestInfo.expected_guest_count
        // }
        value={parseInt(guestCount.toString()).toString()}
        className={styles.inputCon}
        type="number"
        onChange={(e) => {
          let val = Number(e.target.value);
          if (val < 0) val = 0;
          let newVal = parseInt(val.toString());
          dispatch(updateGuest({ expected_guest_count: newVal }));
          setGuestCount(newVal);
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
            // value={guestInfo.checkin_at_door === 1}
            value={isConfirm === "1"}
            onChange={(val) => {
              dispatch(updateGuest({ checkin_at_door: 1 }));
              setIsConfirm(val ? "1" : "0");
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
            // value={guestInfo.checkin_at_door === 0}
            value={isConfirm === "0"}
            onChange={(val) => {
              dispatch(updateGuest({ checkin_at_door: 0 }));
              setIsConfirm(val ? "0" : "1");
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
      <LoadInAndOut
        loadInTime={loadInTime ? dayjs(loadInTime) : undefined}
        loadOutTime={loadOutTime ? dayjs(loadOutTime) : undefined}
        setLoadInTime={setLoadInTime}
        setLoadOutTime={setLoadOutTime}
      />
      <div
        style={{ marginTop: "15px", marginBottom: "20px" }}
        className={styles.title}
      >
        Special Instructions
      </div>
      {/* <div style={{ marginBottom: "20px" }} className={styles.description}>
        {props.specialInstructions && (
          <ContentParse content={props.specialInstructions} />
        )}
      </div> */}
      <div className={styles.special_desc}>
        <TextEditor value={props.specialInstructions} isReadOnly={true} />
        <div className={styles.special_descShadow} />
      </div>
      <div className={styles.special_btnContainer}>
        {props.specialInstructions && (
          <div className={styles.special_btn} onClick={() => setShowDetails(true)}>
            <div className={styles.special_btnTitle}>View Details</div>
            <Image
              src={"/images/icons/arrow-up.svg"}
              alt="arrow"
              width={22}
              height={22}
            />
          </div>
        )}
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
          <Button
            type="Primary"
            label="Save"
            onClick={_saveInfo}
            loading={loading}
          />
        </div>
      </div>
      <Modal open={showDetails} onCancel={() => setShowDetails(false)} footer={null}>
        <div className={styles.special_sectionModalContainer}>
          {/* <div className={styles.dsModalTitle} >Title</div> */}
          <div className={styles.special_sectionModalContent}>
            <TextEditor value={props.specialInstructions} isReadOnly={true} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExpectedGuest;
