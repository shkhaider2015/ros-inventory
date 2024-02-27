"use client"
import React, { useState } from "react";
import styles from "./styles.module.css";
import { Col, Form, Row, Button } from 'antd';
import { DatePicker as AntdDatePicker } from 'antd';
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";


export default function LoadInAndOut() {
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDateValue, setEndDateValue] = useState<Moment | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleRetrieveLastSaved = () => {
    
    const lastSavedDate = getLastSavedDate(); 
    setLastSaved(lastSavedDate);
  };

  return (
    <div className={styles.container}>
      Load-in And out
      <div className={styles.secondcontainer}>
        <Row justify="space-between">
          <Col flex="4" >
            <div> Load in</div>
            <Form.Item
              label="Start Date and Time "
              rules={[{ required: true, message: 'Please select start date and time' }]}
            >
              <AntdDatePicker
                style={{ borderRadius: '25px' }}
                showTime
                onChange={(date) => setStartDate(date ? moment(dayjs(date).toDate()) : null)}
                placeholder="Start date and time"
              />
            </Form.Item>
          </Col>
          <Col flex="1" />
          <Col flex="4">
          <div> Load out</div>
            <Form.Item
              label="End Date and Time "
              rules={[{ required: true, message: 'Please select end date and time' }]}
            >
              <AntdDatePicker
                style={{ borderRadius: '25px' }}
                showTime
                onChange={(date) => setEndDateValue(date ? moment(dayjs(date).toDate()) : null)}
                placeholder="End date and time"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className={styles.button}>

        <Button className={styles.save} onClick={handleRetrieveLastSaved}>
           Save
          </Button>
          </div>

          {lastSaved && (
          <div className={styles.lastSaved}>
            <FontAwesomeIcon icon={faCheckCircle} /> Last Saved: {lastSaved}
          </div>
        )}
      </div>
    </div>
  );
}

function getLastSavedDate(): string {
  return moment().format("MMM DD, YYYY - hh:mmA");
}
