// import React, { CSSProperties, useCallback } from "react";
// import { DatePicker as AntdDatePicker } from "antd";
// import moment, { Moment } from "moment";

// // import { MONTH_DATE_YEAR_TIME_FORMAT } from "@ros-lib/util/timeUtils";

// type Props = {
//   style?: CSSProperties;
//   placeholder?: string;
//   showTime?: boolean;
//   value?: any;
//   disableOldDates?: boolean;
//   onChange?: Function;
//   startDate?: any;
//   endDate?: any;
//   allowOldTime?: boolean;
//   disabled?: boolean;
//   defaultValue?: Moment | undefined;
// };

// function DatePicker({
//   value,
//   style,
//   placeholder = "",
//   showTime = false,
//   onChange,
//   startDate,
//   endDate,
//   allowOldTime,
//   disabled,
//   defaultValue,
// }: Props) {
//   const onValueChanged = useCallback((date: any, dateString: any) => {
//     onChange?.(date, dateString);
//   }, []);

//   const disableOldDates = (current: any) => {
//     // return current && current < moment().startOf("hour");
//     return allowOldTime
//       ? current && current < moment().startOf("day")
//       : current && current < moment().startOf("minute");
//   };

//   function range(start: any, end: any) {
//     const result = [];
//     for (let i = start; i < end; i++) {
//       result.push(i);
//     }
//     return result;
//   }
//   const disableDatesBeforeStartAndEnd = (current: any) => {
//     const startMoment = current;
//     if (startDate && endDate)
//       return (
//         current &&
//         current <= moment(startDate).startOf("day") &&
//         current >= moment(endDate).endOf("day")
//       );
//     if (endDate) return current && current >= moment(endDate).endOf("day");
//     if (startDate)
//       return current && current <= moment(startDate).startOf("day");
//     return false;
//   };

//   function disabledDateTime(current: any) {
//     const isSameDay =
//       moment(current).startOf("day").diff(moment(startDate).startOf("day")) ===
//       0;
//     const isSameHour =
//       moment(current)
//         .startOf("hour")
//         .diff(moment(startDate).startOf("hour")) === 0;
//     return {
//       disabledHours: () => {
//         if (startDate)
//           return isSameDay ? range(0, moment(startDate).hours()) : [];
//         if (endDate) return range(moment(endDate).hours(), 24);
//         else return [];
//       },
//       disabledMinutes: () =>
//         range(
//           0,
//           (startDate &&
//             isSameDay &&
//             isSameHour &&
//             moment(startDate).minute()) ||
//             0
//         ),
//       disabledSeconds: () => [55, 56],
//     };
//   }

//   return (
//     <AntdDatePicker
//       value={value}
//       style={{ width: "100%", ...style }}
//       showTime={showTime}
//       disabledDate={disableDatesBeforeStartAndEnd || disableOldDates}
//       disabledTime={allowOldTime === true ? undefined : disabledDateTime}
//       minuteStep={5}
//       placeholder={placeholder}
//       className="styled-input"
//       onChange={onValueChanged}
//       format={"MMM DD, YYYY hh:mm a"}
//       disabled={disabled}
//       defaultValue={defaultValue}
//     />
//   );
// }

// export default DatePicker;

// import React, { CSSProperties, useCallback } from "react";
// import { DatePicker as AntdDatePicker } from "antd";
// import moment, { Moment } from "moment";

// type Props = {
//   style?: CSSProperties;
//   placeholder?: string;
//   showTime?: boolean;
//   value?: any;
//   onChange?: Function;
//   startDate?: Moment | null;
//   endDate?: Moment | null;
//   allowOldTime?: boolean;
//   disabled?: boolean;
//   defaultValue?: Moment | undefined;
// };

// function DatePicker({
//   value,
//   style,
//   placeholder = "",
//   showTime = false,
//   onChange,
//   startDate,
//   endDate,
//   allowOldTime,
//   disabled,
//   defaultValue,
// }: Props) {
//   const onValueChanged = useCallback(
//     (date: Moment | null, dateString: any) => {
//       onChange?.(date, dateString);
//     },
//     [onChange]
//   );

//   const disableOldDates = (current: any) => {
//     // Disables all past dates
//     return current && current < moment().subtract(1, "days").endOf("day");
//   };

//   const disableDatesBeforeStart = (current: any) => {
//     // Disables dates before the startDate or the current time, if startDate is not set
//     if (startDate) {
//       return (
//         current && current < moment(startDate).subtract(1, "days").endOf("day")
//       );
//     }
//     return disableOldDates(current);
//   };

//   const disabledDateTime = (current: any) => {
//     if (!current) {
//       return {
//         disabledHours: () => [],
//         disabledMinutes: () => [],
//         disabledSeconds: () => [],
//       };
//     }
//     // Disabling time for startDate
//     if (startDate && current.isSame(startDate, "day")) {
//       return {
//         disabledHours: () => range(0, moment(startDate).hours()),
//         disabledMinutes: () =>
//           range(
//             0,
//             moment(startDate).isSame(current, "hour")
//               ? moment(startDate).minutes()
//               : 0
//           ),
//         disabledSeconds: () =>
//           range(
//             0,
//             moment(startDate).isSame(current, "minute")
//               ? moment(startDate).seconds()
//               : 0
//           ),
//       };
//     }
//     // Add additional logic for endDate if necessary
//     return {
//       disabledHours: () => [],
//       disabledMinutes: () => [],
//       disabledSeconds: () => [],
//     };
//   };

//   function range(start: number, end: number): number[] {
//     const result: number[] = [];
//     for (let i = start; i < end; i++) {
//       result.push(i);
//     }
//     return result;
//   }

//   return (
//     <AntdDatePicker
//       value={value}
//       style={{ width: "100%", ...style }}
//       showTime={showTime}
//       disabledDate={startDate ? disableDatesBeforeStart : disableOldDates}
//       disabledTime={
//         allowOldTime === true ? undefined : () => disabledDateTime(value)
//       }
//       minuteStep={5}
//       placeholder={placeholder}
//       className="styled-input"
//       onChange={onValueChanged}
//       format={"MMM DD, YYYY HH:mm:ss"}
//       disabled={disabled}
//       defaultValue={defaultValue}
//     />
//   );
// }

// export default DatePicker;

import React, { CSSProperties, useCallback } from "react";
import { DatePicker as AntdDatePicker } from "antd";
import moment, { Moment } from "moment";

type Props = {
  style?: CSSProperties;
  placeholder?: string;
  showTime?: boolean;
  value?: any;
  onChange?: Function;
  startDate?: Moment | null;
  endDate?: Moment | null;
  allowOldTime?: boolean;
  disabled?: boolean;
  defaultValue?: Moment | undefined;
};

function DatePicker({
  value,
  style,
  placeholder = "",
  showTime = false,
  onChange,
  startDate,
  endDate,
  allowOldTime,
  disabled,
  defaultValue,
}: Props) {
  const onValueChanged = useCallback(
    (date: Moment | null, dateString: any) => {
      onChange?.(date, dateString);
    },
    [onChange]
  );

  const disableOldDates = (current: any) => {
    // Disables all past dates and times
    return current && current < moment().startOf("minute");
  };

  const disableDatesBeforeStart = (current: any) => {
    // Disables dates and times before the startDate or the current date and time
    if (startDate) {
      return (
        current && current < moment.max(startDate, moment()).startOf("minute")
      );
    }
    return disableOldDates(current);
  };

  const disabledDateTime = (current: any) => {
    if (!current)
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };

    let disabledHours: any = [];
    let disabledMinutes: any = [];
    let disabledSeconds: any = [];

    // Adjust logic based on startDate
    if (startDate && current.isSame(startDate, "day")) {
      disabledHours = range(0, moment(startDate).hours());
      if (current.isSame(startDate, "hour")) {
        disabledMinutes = range(0, moment(startDate).minutes());
        if (current.isSame(startDate, "minute")) {
          disabledSeconds = range(0, moment(startDate).seconds());
        }
      }
    }

    // Customize this part if you have logic based on endDate

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes,
      disabledSeconds: () => disabledSeconds,
    };
  };

  function range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  return (
    <AntdDatePicker
      value={value}
      style={{ width: "100%", ...style }}
      showTime={showTime}
      disabledDate={disableDatesBeforeStart}
      disabledTime={allowOldTime ? undefined : () => disabledDateTime(value)}
      minuteStep={5}
      placeholder={placeholder}
      className="styled-input"
      onChange={onValueChanged}
      format={"MMM DD, YYYY HH:mm:ss"}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
}

export default DatePicker;
