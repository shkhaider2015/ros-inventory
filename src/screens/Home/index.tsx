import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";
import EventSupplyItem from "@/components/EventSupplyItem";

const HomeScreen = () => {
  const eventData: {
    title: string;
    url: string;
    price: number;
    units: number;
    desc: string;
    updatedAt: string;
  }[] = [
    {
      title: "High Top ",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 12,
      units: 15,
      url: "/images/dummy/es1.png",
      updatedAt: "Nov 15, 2023   11:00PM GST",
    },
    {
      title: "Coffee table",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 10,
      units: 91,
      url: "/images/dummy/es2.png",
      updatedAt: "Nov 02, 2023   11:00PM GST",
    },
    {
      title: "Chairs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 11,
      units: 11,
      url: "/images/dummy/es3.png",
      updatedAt: "Nov 23, 2023   11:00PM GST",
    },
    {
      title: "Sofa Set",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 20,
      units: 10,
      url: "/images/dummy/es4.png",
      updatedAt: "Nov 12, 2023   11:00PM GST",
    },
  ];

  return (
    <main className={styles.container}>
      <EventTopRow />
      <div className={styles.sectionContainer}>
        {/* Left Side Column */}
        <section className={styles.section}>
          <InventoryDetails />
          <div className={styles.header} >Event Supply</div>
          {eventData.map((item, index) => (
            <EventSupplyItem {...item} key={item.title + index} />
          ))}
        </section>

        {/* Right Side Column */}
        <aside className={styles.aside}>
          <CheckedOut />
        </aside>
      </div>
    </main>
  );
};

export default HomeScreen;
