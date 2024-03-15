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

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

console.log("test");

const LoadInAndOut = (props: IProps) => {
  const { loadInTime, loadOutTime, setLoadInTime, setLoadOutTime } = props;
  const dispatch = useDispatch();


  const disableDates = (date:Dayjs, type:'loadin' | 'loadout') => {
    if(type === "loadin") {
      const loadOut = loadOutTime?.endOf('day');
      if(loadOut) return (date && date.isBefore(dayjs().startOf('day'))) || (date && date.isAfter(loadOut?.endOf('day')))
      else return (date && date.isBefore(dayjs().startOf('day')))
      
    } else {
      const loadIn = loadInTime?.startOf('day');
      if (loadIn) return (date && date.isBefore(dayjs().startOf('day'))) || (date && date.isBefore(loadIn?.startOf('day')))
      else return date && date.isBefore(dayjs().startOf('day'))
    }
  }

  const disableTimes = (date:Dayjs, type:'loadin' | 'loadout') => {
    if(type === 'loadin') {
      const isSameDate = date.isSame(loadOutTime, 'date')
      const isSameHour = date.isSame(loadOutTime, 'hour')
      const hour = loadOutTime?.hour();
      const minutes = loadOutTime?.minute();

      return {
        disabledHours: () => isSameDate && hour ? range(0, 24).splice(hour+1) : [],
        disabledMinutes: () => isSameDate && isSameHour && minutes ? range(1, 60).splice(minutes+1) : [],
        disabledSeconds: () => [],
      };
    } else {
      const isSameDate = date.isSame(loadInTime, 'date')
      const isSameHour = date.isSame(loadInTime, 'hour')
      const hour = loadInTime?.hour();
      const minutes = loadInTime?.minute();

      return {
        disabledHours: () => isSameDate && hour ? range(0, 24).splice(0, hour) : [],
        disabledMinutes: () => isSameDate && isSameHour && minutes ? range(1, 60).splice(0, minutes+1) : [],
        disabledSeconds: () => [],
      };
    }
  }

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
        <Row justify="space-between" gutter={[20, 0]}>
          <Col xs={24} sm={12} lg={12} xl={12}  >
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
                // style={{ width: "65%", borderRadius: "10px" }}
                className={styles.loadDatePicker}
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={(date) => disableDates(date, 'loadin')}
                disabledTime={(date) => disableTimes(date, 'loadin')}
                onChange={onStartChange}
                value={loadInTime}
                
              />
            </Form.Item>
          </Col>
          {/* <Col flex="1" /> */}
          <Col xs={24} sm={12} lg={12} xl={12} >
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
                // style={{ width: "100%", borderRadius: "10px" }}
                className={styles.loadDatePicker}
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={(date) => disableDates(date, 'loadout')}
                disabledTime={(date) => disableTimes(date, 'loadout')}
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
