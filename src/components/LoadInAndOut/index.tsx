"use client";
import React from "react";
import styles from "./styles.module.css";
import { Col, Form, Row } from "antd";
import { DatePicker as AntdDatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateFormFields } from "@/store/features/formFields";

import dayjs, { Dayjs } from "dayjs";

interface IProps {
  loadInTime: Dayjs | undefined;
  loadOutTime: Dayjs | undefined;
  setLoadInTime: (value: Dayjs | null) => void;
  setLoadOutTime: (value: Dayjs | null) => void;
}

const LoadInAndOut = (props: IProps) => {
  const { loadInTime, loadOutTime, setLoadInTime, setLoadOutTime } = props;
  const dispatch = useDispatch();

  const disabledStartDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs().startOf("minute"));
  };

  const disabledEndDate = (current: Dayjs) => {
    if (!loadInTime) {
      return current && current.isBefore(dayjs().startOf("minute"));
    }
    return (
      (current &&
        (current.isBefore(loadInTime.startOf("day"), "day") ||
          (current.isSame(loadInTime.startOf("day"), "day") &&
            current.isBefore(loadInTime)))) ||
      current.isBefore(dayjs().startOf("minute"))
    );
  };

  const onStartChange = (value: any) => {
    setLoadInTime(value);
    dispatch(updateFormFields({ isFormFieldsChanged: true }));
  };

  const onEndChange = (value: any) => {
    setLoadOutTime(value);
    dispatch(updateFormFields({ isFormFieldsChanged: true }));
  };

  const timeFormat: any = {
    format: "MMM DD, YYYY hh:mm a",
    minuteStep: 5,
    use12Hours: true,
  };

  return (
    <div className={styles.container}>
      <div
        style={{ marginBottom: "20px", fontSize: "16px" }}
        className={styles.title}
      >
        Load-in & out
      </div>
      <div className={styles.secondcontainer}>
        <Row justify="space-between">
          <Col flex="3">
            <Form.Item
              label="Load in"
              style={{ fontWeight: "bold" }}
              rules={[
                {
                  required: true,
                  message: "Please select Load-in date and time",
                },
              ]}
            >
              <AntdDatePicker
                style={{ width: "65%", borderRadius: "10px" }}
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={disabledStartDate}
                onChange={onStartChange}
                value={loadInTime}
              />
            </Form.Item>
          </Col>
          {/* <Col flex="1" /> */}
          <Col flex="3">
            <Form.Item
              label="Load-out "
              style={{ fontWeight: "bold" }}
              rules={[
                {
                  required: true,
                  message: "Please select Load-out date and time",
                },
              ]}
            >
              <AntdDatePicker
                style={{ width: "65%", borderRadius: "10px" }}
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={disabledEndDate}
                onChange={onEndChange}
                value={loadOutTime}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoadInAndOut;
