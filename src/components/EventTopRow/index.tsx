import styles from "./styles.module.css";

const EventTopRow = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topCon}>
        <div className={styles.title}>Lavan New York</div>
        <div className={styles.jumpSec}>
          <span>Jump to: </span>
          <div>{/* DropDown */}</div>
        </div>
      </div>
      <div className={styles.bottomCon}>
        <div className={styles.leftSec}>
          <div className={styles.desc}>VISITING FROM</div>
          <div className={styles.title}>Gil’s Birthday Party</div>
          <div className={styles.date}>November 30, 2023 2:00PM</div>
        </div>
        <div className={styles.rightSec}>
          <button>Back to Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventTopRow;
