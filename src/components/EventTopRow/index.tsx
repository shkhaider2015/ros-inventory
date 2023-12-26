
import Button from "../common/Button";
import styles from "./styles.module.css";

// const dropDownData: { label: string; value: string }[] = [
//   { label: "Inventory Details", value: "INVENTORY_DETAILS" },
//   { label: "Event Supply", value: "EVENT_SUPPLY" },
//   { label: "Venue Specifications", value: "VENUE_SPECIFICATION" },
//   { label: "Kitchen Supply", value: "KITCHEN_SUPPLY" },
//   { label: "Insurance Requirements", value: "INSURANCE_REQUIREMENTS" },
// ];

const EventTopRow = (props:any) => {
  
  return (
    <div className={styles.container}>
      {/* <div className={styles.topCon}>
        <div className={styles.title}>Lavan New York</div>
        <div className={styles.jumpSec}>
          <span className={styles.txt} >Jump to: </span>
          <div className={styles.dropdownCon} >
            <Dropdown values={dropDownData} onChange={(val) => _scrollToScreen(val)} />
          </div>
        </div>
      </div> */}
      <div className={styles.bottomCon}>
        <div className={styles.leftSec}>
          <div className={styles.desc}>VISITING FROM</div>
          <div className={styles.title}>{props?.name}</div>
          <div className={styles.date}>{props?.start_date}</div>
        </div>
        <div className={styles.rightSec}>
          <Button label="Back to event" type="Secondary" />
        </div>
      </div>
    </div>
  );
};



export default EventTopRow;
