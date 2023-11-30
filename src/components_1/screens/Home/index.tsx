import ClientVenuePortalScreen from "../ClientVenuePortal";
import EventSupplyScreen from "../EventSupply";
import styles from "./styles.module.css";
import KitchenSupplyScreen from "../KitchenSupply";

const HomeScreen = () => {

  return (
    <div className={styles.container}>
     
      <h3 className={styles.pageHeader}>Cient Venue Portal</h3>
        <ClientVenuePortalScreen  />
        <h3  className={styles.pageHeader}>Event Supply</h3>
        <EventSupplyScreen />
        <h3 className={styles.pageHeader}>Kitchen Supply</h3>
        <div style={{height: '60vh'}} >

        </div>
        <KitchenSupplyScreen />
    </div>
  );
};

export default HomeScreen;
