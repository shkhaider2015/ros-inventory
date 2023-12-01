import Header from "@/components/Header";
import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";

const HomeScreen = () => {
  return (
    <main className={styles.container}>
      <EventTopRow />
      <div className={styles.sectionContainer} >
        <section className={styles.section} >
          <InventoryDetails />
        </section>
        <aside className={styles.aside} >
          <CheckedOut />
        </aside>
      </div>
    </main>
  );
};

export default HomeScreen;
