import Header from "@/components/Header";
import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";

const HomeScreen = () => {
  return (
    <main className={styles.container}>
      <EventTopRow />
      <div className={styles.sectionContainer} >
        <section className={styles.section} >jdasdj</section>
        <aside className={styles.aside} >shdfjsd</aside>
      </div>
    </main>
  );
};

export default HomeScreen;
