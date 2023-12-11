import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";
import EventSupplyItem from "@/components/EventSupplyItem";
import VenueSpecificationItem from "@/components/VenueSpecificationItem";
import InsuranceRequirements from "@/components/InsuranceRequirements";
import ElementHead from "@/components/ElementHead";

const HomeScreen = () => {
  const data: IInventoryItem[] = [
    {
      id: '1',
      name: "Stove",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      quantity: 20,
      rental_price: 102,
      icon_url: "/images/dummy/k1.png",
      updated_at: "Updated: Nov 10, 2023   11:00PM GST",
      type: "KITCHEN_SUPPLY"
    },
    {
      id: '2',
      name: "Cooktop",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      quantity: 10,
      rental_price: 152,
      icon_url: "/images/dummy/k2.png",
      updated_at: "Updated: Nov 01, 2023   11:00PM GST",
      type: "KITCHEN_SUPPLY"
    },
    {
      id: '3',
      name: "High Top ",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      rental_price: 12,
      quantity: 15,
      icon_url: "/images/dummy/es1.png",
      updated_at: "Nov 15, 2023   11:00PM GST",
      type: "INVENTORY_MENU"
    },
    {
      id: '4',
      name: "Coffee table",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      rental_price: 10,
      quantity: 91,
      icon_url: "/images/dummy/es2.png",
      updated_at: "Nov 02, 2023   11:00PM GST",
      type: "INVENTORY_MENU"
    },
    {
      id: '5',
      name: "Chairs",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      rental_price: 11,
      quantity: 11,
      icon_url: "/images/dummy/es3.png",
      updated_at: "Nov 23, 2023   11:00PM GST",
      type: "INVENTORY_MENU"
    },
    {
      id: '6',
      name: "Sofa Set",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      rental_price: 20,
      quantity: 10,
      icon_url: "/images/dummy/es4.png",
      updated_at: "Nov 12, 2023   11:00PM GST",
      type: "INVENTORY_MENU"
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
          {data.filter(item => item.type === "INVENTORY_MENU").map((item, index) => (
            <EventSupplyItem {...item} key={item.name + index} />
          ))}

          <ElementHead name="VENUE_SPECIFICATION" text="Venue Specifications" />

          <div className={styles.venueContainer}>
            {venueData.map((item, index) => (
              <VenueSpecificationItem {...item} key={item.title + index} />
            ))}
          </div>

          <ElementHead name="KITCHEN_SUPPLY" text="Kitchen Supply" />

          {data.filter(item => item.type === 'KITCHEN_SUPPLY' ).map((item, index) => (
            <EventSupplyItem {...item} key={item.name + index} />
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

interface IInventoryInfo {
  description: string;
  email_address: string;
  logo_url: Blob | string | undefined;
  phone_number: string;
  secondary_email_address: string;
  secondary_phone_number: string;
  workspace_id: string;
  id?: string;
}

interface IInventoryItem {
  description: string;
  icon_url: string | undefined;
  id: string;
  name: string;
  quantity: number;
  rental_price: number;
  type: 'INVENTORY_MENU' | 'VENUE_SPEC' | 'KITCHEN_SUPPLY';
  workspace_id?: string;
  updated_at?: string
}

export default HomeScreen;
