"use client";
import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { Col, Form, Row } from "antd";
import { DatePicker as AntdDatePicker } from "antd";
import moment, { Moment } from "moment";
// import dayjs, { Dayjs } from "dayjs";

interface IProps {
  loadInTime: Moment | undefined;
  loadOutTime: Moment | undefined;
  setLoadInTime: (value: Moment | null) => void;
  setLoadOutTime: (value: Moment | null) => void;
}

const LoadInAndOut = (props: IProps) => {
  const { loadInTime, loadOutTime, setLoadInTime, setLoadOutTime } = props;

  console.log(loadInTime, "load in time at compnent");
  console.log(loadOutTime, "load out time at component");

  const disabledStartDate = (current: any) => {
    return current && current < moment().startOf("minute");
  };

  const disabledEndDate = (current: any) => {
    if (!loadInTime) {
      return current && current < moment().startOf("minute");
    }
    const startOfDay = moment(loadInTime).startOf("day");
    return (
      current &&
      (current.isBefore(startOfDay, "day") ||
        (current.isSame(startOfDay, "day") && current.isBefore(loadInTime)) ||
        current < moment().startOf("minute"))
    );
  };

  // const disabledPastTime = (current: any) => {
  //   const now = moment();
  //   return current && current.isBefore(now);
  // };

  // // Function to disable times before the start time for the end time picker
  // const disabledBeforeStartTime = (current: any) => {
  //   return current && loadInTime && current < loadInTime;
  // };

  // const onStartChange = useCallback(
  //   (value: any) => {
  //     const newValue = value
  //       ? loadInTime
  //         ? value.set({
  //             hour: loadInTime.hour(),
  //             minute: loadInTime.minute(),
  //             second: loadInTime.second(),
  //           })
  //         : value
  //       : null;
  //     setLoadInTime(newValue);
  //     console.log("re-render test");
  //   },
  //   [loadInTime]
  // );

  // const onEndChange = useCallback(
  //   (value: any) => {
  //     const newValue = value
  //       ? loadOutTime
  //         ? value.set({
  //             hour: loadOutTime.hour(),
  //             minute: loadOutTime.minute(),
  //             second: loadOutTime.second(),
  //           })
  //         : value
  //       : null;
  //     setLoadOutTime(newValue);
  //     console.log("re-render test");
  //   },
  //   [loadOutTime]
  // );

  const onStartChange = useCallback(
    (value: any) => {
      const newValue = value
        ? // Check if new time is different from existing state
          loadInTime && !value.isSame(loadInTime, "minute")
          ? value.set({
              hour: loadInTime.hour(),
              minute: loadInTime.minute(),
              second: loadInTime.second(),
            })
          : value.set({
              hour: 0, // Set initial time to 00:00 on change
              minute: 0,
              second: 0,
            })
        : null;
      setLoadInTime(newValue);
      console.log("re-render test");
    },
    [loadInTime]
  );

  const onEndChange = useCallback(
    (value: any) => {
      const newValue = value
        ? // Check if new time is different from existing state
          loadOutTime && !value.isSame(loadOutTime, "minute")
          ? value.set({
              hour: loadOutTime.hour(),
              minute: loadOutTime.minute(),
              second: loadOutTime.second(),
            })
          : value.set({
              hour: 0, // Set initial time to 00:00 on change
              minute: 0,
              second: 0,
            })
        : null;
      setLoadOutTime(newValue);
      console.log("re-render test");
    },
    [loadOutTime]
  );

  const timeFormat: any = {
    format: "MMM DD, YYYY hh:mm a",
    minuteStep: 5,
    use12Hours: true,
  };

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "20px" }} className={styles.title}>
        Load-in & out
      </div>
      <div className={styles.secondcontainer}>
        <Row justify="space-between">
          <Col flex="4">
            <Form.Item
              label="Load in"
              rules={[
                {
                  required: true,
                  message: "Please select Load-in date and time",
                },
              ]}
            >
              <AntdDatePicker
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={disabledStartDate}
                onChange={onStartChange}
                value={loadInTime}
              />
            </Form.Item>
          </Col>
          <Col flex="1" />
          <Col flex="4">
            <Form.Item
              label="Load-out "
              rules={[
                {
                  required: true,
                  message: "Please select Load-out date and time",
                },
              ]}
            >
              <AntdDatePicker
                showTime={timeFormat}
                format="MMM DD, YYYY hh:mm a"
                disabledDate={disabledEndDate}
                onChange={onEndChange}
                value={moment(loadOutTime)}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: "20px" }} className={styles.title}>
        Special Instructions
      </div>
    </div>
  );
};

export default LoadInAndOut;

// "use client";
// import React, { useState } from "react";
// import styles from "./styles.module.css";
// import { Col, Form, Row, Button } from "antd";
// import { DatePicker as AntdDatePicker } from "antd";
// import moment, { Moment } from "moment";
// import dayjs, { Dayjs } from "dayjs";
// import DatePicker from "../DatePicker/DatePicker";

// interface IProps {
//   loadInTime: Moment | undefined;
//   loadOutTime: Moment | undefined;
//   setLoadInTime: (value: Moment | null) => void;
//   setLoadOutTime: (value: Moment | null) => void;
// }

// const LoadInAndOut = (props: IProps) => {
//   const { loadInTime, loadOutTime, setLoadInTime, setLoadOutTime } = props;
//   const [lastSaved, setLastSaved] = useState<string | null>(null);

//   const handleRetrieveLastSaved = () => {
//     const lastSavedDate = getLastSavedDate();
//     setLastSaved(lastSavedDate);
//   };

//   console.log(loadInTime, "load in time 2");
//   console.log(loadOutTime, "load out time 2");

//   // Function to disable past dates for the start date picker
//   const disabledStartDate = (current: any) => {
//     // Can not select days before today
//     return current && current < moment().startOf("day");
//   };

//   // Function to disable dates for the end date picker
//   const disabledEndDate = (current: any) => {
//     // Can not select days before the start date or before today
//     return (
//       current &&
//       (current.isBefore(loadInTime, "day") || current < moment().startOf("day"))
//     );
//   };

//   // Handlers for date changes
//   const onStartChange = (value: any) => {
//     setLoadInTime(value);
//   };

//   const onEndChange = (value: any) => {
//     setLoadOutTime(value);
//   };

//   // Time format for the time picker
//   const timeFormat: any = {
//     format: "MMM DD, YYYY hh:mm a",
//     minuteStep: 15, // Change this as needed
//     use12Hours: true,
//   };

//   return (
//     <div className={styles.container}>
//       <div style={{ marginBottom: "20px" }} className={styles.title}>
//         Load-in & out
//       </div>
//       <div className={styles.secondcontainer}>
//         <Row justify="space-between">
//           <Col flex="4">
//             <Form.Item
//               label="Load in"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select Load-in date and time",
//                 },
//               ]}
//             >
//               <DatePicker
//                 showTime={timeFormat}
//                 format="MMM DD, YYYY hh:mm a"
//                 disabledDate={disabledStartDate}
//                 onChange={onStartChange}
//                 value={loadInTime}
//               />
//             </Form.Item>
//           </Col>
//           <Col flex="1" />
//           <Col flex="4">
//             <Form.Item
//               label="Load-out "
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select Load-out date and time",
//                 },
//               ]}
//             >
//               <DatePicker
//                 showTime={timeFormat}
//                 format="MMM DD, YYYY hh:mm a"
//                 disabledDate={disabledEndDate}
//                 onChange={onEndChange}
//                 value={loadOutTime}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//       </div>
//       <div style={{ marginBottom: "20px" }} className={styles.title}>
//         Special Instructions
//       </div>
//     </div>
//   );
// };

// function getLastSavedDate(): string {
//   return moment().format("MMM DD, YYYY - hh:mmA");
// }

// export default LoadInAndOut;
