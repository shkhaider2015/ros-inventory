import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";
import EventSupplyItem from "@/components/EventSupplyItem";
import VenueSpecificationItem from "@/components/VenueSpecificationItem";
import InsuranceRequirements from "@/components/InsuranceRequirements";
import ElementHead from "@/components/ElementHead";

const HomeScreen = () => {
  const eventData: IItem[] = [
    {
      id: '3',
      title: "High Top ",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 12,
      units: 15,
      url: "/images/dummy/es1.png",
      updatedAt: "Nov 15, 2023   11:00PM GST",
    },
    {
      id: '4',
      title: "Coffee table",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 10,
      units: 91,
      url: "/images/dummy/es2.png",
      updatedAt: "Nov 02, 2023   11:00PM GST",
    },
    {
      id: '5',
      title: "Chairs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 11,
      units: 11,
      url: "/images/dummy/es3.png",
      updatedAt: "Nov 23, 2023   11:00PM GST",
    },
    {
      id: '6',
      title: "Sofa Set",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 20,
      units: 10,
      url: "/images/dummy/es4.png",
      updatedAt: "Nov 12, 2023   11:00PM GST",
    },
  ];

  const kitchenItems: IItem[] = [
    {
      id: '1',
      title: "Stove",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 20,
      units: 102,
      url: "/images/dummy/k1.png",
      updatedAt: "Updated: Nov 10, 2023   11:00PM GST",
    },
    {
      id: '2',
      title: "Cooktop",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      price: 10,
      units: 152,
      url: "/images/dummy/k2.png",
      updatedAt: "Updated: Nov 01, 2023   11:00PM GST",
    },
  ];

  const venueData: IVenueItem[] = [
    {
      url: "/images/icons/tec_spec.svg",
      title: "Technical Specs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
    },
    {
      url: "/images/icons/flash.svg",
      title: "Power Specs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
    },
    {
      url: "/images/icons/lightning.svg",
      title: "Lighting Specs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
    },
    {
      url: "/images/icons/wifi.svg",
      title: "Wifi Specs",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
    },
  ];



  return (
    <main className={styles.container}>
      <EventTopRow />
      <div className={styles.sectionContainer}>
        {/* Left Side Column */}
        <section className={styles.section}>
          <InventoryDetails />
          <ElementHead name="EVENT_SUPPLY" text="Event Supply" />
          {/* <div className={styles.header}></div> */}
          {eventData.map((item, index) => (
            <EventSupplyItem {...item} key={item.title + index} />
          ))}

          <ElementHead name="VENUE_SPECIFICATION" text="Venue Specifications" />

          <div className={styles.venueContainer}>
            {venueData.map((item, index) => (
              <VenueSpecificationItem {...item} key={item.title + index} />
            ))}
          </div>

          <ElementHead name="KITCHEN_SUPPLY" text="Kitchen Supply" />

          {kitchenItems.map((item, index) => (
            <EventSupplyItem {...item} key={item.title + index} />
          ))}
          <ElementHead
            name="INSURANCE_REQUIREMENTS"
            text="Insurance Requirements"
          />

          <InsuranceRequirements />
        </section>

        {/* Right Side Column */}
        <aside className={styles.aside}>
          <CheckedOut />
        </aside>
      </div>
    </main>
  );
};

interface IItem {
  id: string;
  title: string;
  url: string;
  price: number;
  units: number;
  desc: string;
  updatedAt: string;
}

interface IVenueItem {
  url: string;
  title: string;
  desc: string;
}

export default HomeScreen;
