import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";
import EventSupplyItem from "@/components/EventSupplyItem";
import VenueSpecificationItem from "@/components/VenueSpecificationItem";
import ElementHead from "@/components/ElementHead";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import SocialMediaIcon from "@/components/SocialMediaIcons";
import DocumentSection from "@/components/DocumentSection";

const HomeScreen = (props: {
  workspaceInfo: IInventoryInfo;
  items: IInventoryItem[];
  eventInfo: any;
  contacts: any[];
  socialMedia: IScoialMedia[];
}) => {
  return (
    <main className={styles.container}>
      <EventTopRow {...props.eventInfo} />
      <Tabs />
      <div className={styles.sectionContainer}>
        {/* Left Side Column */}
        <section className={styles.section}>
          <InventoryDetails
            info={props.workspaceInfo}
            contacts={props.contacts}
          />
          <DocumentSection item={props.items.find(item => item.type === "ABOUT_THE_VENUE" )} />
          <ElementHead name="scrollto_2" text="Event Supply" />
          {/* <div className={styles.header}></div> */}
          {props.items
            .filter((item) => item.type === "INVENTORY_MENU")
            .map((item, index) => (
              <EventSupplyItem {...item} key={item.name + index} />
            ))}

          <ElementHead name="scrollto_3" text="Venue Specifications" />

          <div className={styles.venueContainer}>
            {props.items
              .filter((item) => item.type === "VENUE_SPEC")
              .map((item, index) => (
                <VenueSpecificationItem {...item} key={item.id + index} />
              ))}
          </div>

          <ElementHead name="scrollto_4" text="Kitchen Supply" />

          {props.items
            .filter((item) => item.type === "KITCHEN_SUPPLY")
            .map((item, index) => (
              <EventSupplyItem {...item} key={item.name + index} />
            ))}
          <ElementHead name="scrollto_5" text="Insurance Requirements" />

          <DocumentSection item={props.items.find(item => item.type === "INSURANCE_REQUIREMENTS" )} section_type={"Insurance Requirements"} />
          <DocumentSection item={props.items.find(item => item.type === "FOOD_AND_BEVERAGE" )} section_type={"Food and Beverage"} />
          <DocumentSection item={props.items.find(item => item.type === "MISC" )} section_type={"Misc"} />

          <SocialMediaIcon items={props.socialMedia} />

          {/* <div className={styles.upArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M18 18L12 12L6 18" stroke="#ffffff" stroke-width="2" />
              <path d="M18 12L12 6L6 12" stroke="#ffffff" stroke-width="2" />
            </svg>
          </div> */}
        </section>

        {/* Right Side Column */}
        <aside className={styles.aside}>
          <CheckedOut />
        </aside>
      </div>
    </main>
  );
};

interface IInventoryInfo {
  description: string;
  email_address: string;
  logo_url: string | undefined;
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
  type: | 'INVENTORY_MENU'
  | 'VENUE_SPEC'
  | 'KITCHEN_SUPPLY'
  | 'ABOUT_THE_VENUE'
  | 'INSURANCE_REQUIREMENTS'
  | 'FOOD_AND_BEVERAGE'
  | 'MISC';
  workspace_id?: string;
  updated_at?: string;
}

interface IScoialMedia {
  id: string;
  platform_name: string;
  url: string;
  icon: string;
}

export default HomeScreen;
