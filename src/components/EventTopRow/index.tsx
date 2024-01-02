"use client"
import { IEventInfo } from "@/screens/Home";
import Button from "../common/Button";
import styles from "./styles.module.css";
import moment from "moment";


const EventTopRow = (props:IEventInfo) => {
  
  
  return (
    <div className={styles.container}>
      <div className={styles.bottomCon}>
        <div className={styles.leftSec}>
          {/* <div className={styles.desc}>VISITING FROM</div> */}
          <div className={styles.title}>{props?.name}</div>
          <div className={styles.date}>{moment(props?.start).format('MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A')}</div>
        </div>
        <div className={styles.rightSec}>
          {/* <Button label="Back to event" type="Secondary" onClick={() => window.open(props?.link, "_blank")} /> */}
        </div>
      </div>
    </div>
  );
};



export default EventTopRow;
