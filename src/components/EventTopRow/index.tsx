"use client";
import { IEventInfo } from "@/screens/Home";
import styles from "./EventTopRow.module.css";
import moment from "moment";

const EventTopRow = (props: IEventInfo) => {
  // console.log("Event Info : ", props);

  return (
    <div className={styles.container}>
      <div className={styles.bottomCon}>
        <div className={styles.leftSec}>
          {/* <div className={styles.desc}>VISITING FROM</div> */}
          <div className={styles.title}>{props?.name}</div>
          <div className={styles.date}>
            {moment(props?.start).format(
              "MMMM, D YYYY\xa0\xa0\xa0\xa0\xa0hh:mm A"
            )}
          </div>
          <div className={styles.info}>
            {/* <table>
              <tbody>
                {props.client_name && <tr>
                  <td>Customer Name:</td>
                  <td>{props.client_name}</td>
                </tr>}
                {
                  props.client_email && <tr>
                  <td>Email:</td>
                  <td>{props.client_email}</td>
                </tr>
                }
                {
                  props.client_main_contact && <tr>
                  <td>Customer Main Point of Contact:</td>
                  <td>{props.client_main_contact}</td>
                </tr>
                }
                {
                  props.client_phone_number && <tr>
                  <td>Customer Phone Number:</td>
                  <td>{props.client_phone_number}</td>
                </tr>
                }
                
                
              </tbody>
            </table> */}
            {props.client_name && (
              <div>
                Customer Name: <span>{props.client_name}</span>
              </div>
            )}
            {props.client_main_contact && (
              <div>
                Customer Main Point of Contact:{" "}
                <span>{props.client_main_contact}</span>
              </div>
            )}
            {props.client_phone_number && (
              <div>
                Customer Phone Number: <span>{props.client_phone_number}</span>
              </div>
            )}
            {props.client_email && (
              <div>
                Email: <span>{props.client_email}</span>
              </div>
            )}

            {/* <div>Customer Name: {props.client_name} </div>
            <div>Email: {props.client_email} </div>
            <div>
              Customer Main Point of Contact: {props.client_main_contact}{" "}
            </div>
            <div>Customer Phone Number: {props.client_phone_number} </div> */}
          </div>
        </div>
        <div className={styles.rightSec}>
          {/* <Button label="Back to event" type="Secondary" onClick={() => window.open(props?.link, "_blank")} /> */}
        </div>
      </div>
    </div>
  );
};

export default EventTopRow;
