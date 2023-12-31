import styles from "./styles.module.css";
import EventTopRow from "@/components/EventTopRow";
import InventoryDetails from "@/components/InventoryDetails";
import CheckedOut from "@/components/CheckedOut";
import EventSupplyItem from "@/components/EventSupplyItem";
import VenueSpecificationItem from "@/components/VenueSpecificationItem";
import ElementHead from "@/components/ElementHead";
import Tabs from "@/components/Tabs";
import SocialMediaIcon from "@/components/SocialMediaIcons";
import DocumentSection from "@/components/DocumentSection";
import ExpectedGuest from "@/components/ExpectedGuest";
import GlobalModal from "@/components/common/GlobalModal";

const HomeScreen = (props: {
  workspaceInfo: IInventoryInfo;
  items: IInventoryItem[];
  eventInfo: IEventInfo;
  contacts: any[];
  socialMedia: IScoialMedia[];
  attachements: IAttachements[];
  guest_info: IGuestInfo;
  cart_items: any[];
  event_id: string;
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
          <ExpectedGuest initialData={props.guest_info} />
          <ElementHead name="scrollto_2" text="About The Venue" />
          <DocumentSection
            item={props.items.find((item) => item.type === "ABOUT_THE_VENUE")}
            section_type={"ABOUT_THE_VENUE"}
            section_title={"About The Venue"}
            attachements={props.attachements}
            event_id={props.event_id}
            workspace_id={props.workspaceInfo.workspace_id}
          />
          <ElementHead name="scrollto_3" text="Event Supply" />
          {/* <div className={styles.header}></div> */}
          {props.items
            .filter((item) => item.type === "INVENTORY_MENU")
            .map((item, index) => (
              <EventSupplyItem {...item} key={item.name + index} />
            ))}

          <ElementHead name="scrollto_4" text="Venue Specifications" />

          <div className={styles.venueContainer}>
            {props.items
              .filter((item) => item.type === "VENUE_SPEC")
              .map((item, index) => (
                <VenueSpecificationItem {...item} key={item.id + index} />
              ))}
          </div>

          <ElementHead name="scrollto_5" text="Kitchen Supply" />

          {props.items
            .filter((item) => item.type === "KITCHEN_SUPPLY")
            .map((item, index) => (
              <EventSupplyItem {...item} key={item.name + index} />
            ))}
          <ElementHead name="scrollto_6" text="Insurance Requirements" />

          <DocumentSection
            item={props.items.find(
              (item) => item.type === "INSURANCE_REQUIREMENTS"
            )}
            section_type={"INSURANCE_REQUIREMENTS"}
            section_title={"Insurance Requirements"}
            attachements={props.attachements}
            event_id={props.event_id}
            workspace_id={props.workspaceInfo.workspace_id}
          />
          <ElementHead name="scrollto_7" text="Food and Beverage" />
          <DocumentSection
            item={props.items.find((item) => item.type === "FOOD_AND_BEVERAGE")}
            section_type={"FOOD_AND_BEVERAGE"}
            section_title={"Food and Beverage"}
            attachements={props.attachements}
            event_id={props.event_id}
            workspace_id={props.workspaceInfo.workspace_id}
          />
          <ElementHead name="scrollto_8" text="Misc" />
          <DocumentSection
            item={props.items.find((item) => item.type === "MISC")}
            section_type={"MISC"}
            section_title={"Misc"}
            attachements={props.attachements}
            event_id={props.event_id}
            workspace_id={props.workspaceInfo.workspace_id}
          />

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
          <CheckedOut
            event_id={props.event_id}
            initialData={props.cart_items}
            updated_at={props.guest_info.updated_at}
          />
        </aside>
        <GlobalModal />
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

export interface IInventoryItem {
  description: string;
  icon_url: string | undefined;
  id: string;
  name: string;
  quantity: number;
  rental_price: number;
  type:
    | "INVENTORY_MENU"
    | "VENUE_SPEC"
    | "KITCHEN_SUPPLY"
    | "ABOUT_THE_VENUE"
    | "INSURANCE_REQUIREMENTS"
    | "FOOD_AND_BEVERAGE"
    | "MISC";
  event_id: string;
  workspace_id?: string;
  updated_at?: string;
  additional_images?: {
    images: string[];
  };
}

interface IScoialMedia {
  id: string;
  platform_name: string;
  url: string;
  icon: string;
}

export interface IEventInfo {
  id: string;
  name: string;
  location: string;
  start: string;
  end: string;
  link: string;
  client_name: string | null;
  client_main_contact: string | null;
  client_email: string | null;
  client_phone_number: string | null;
}

export interface IAttachements {
  id: string;
  description: string;
  file_type: string;
  name: string;
  section_type: string;
  url: string;
  workspace_id: string;
  file_logo?: string;
  uploaded_via: "CLIENT" | "ADMIN";
}

export interface IGuestInfo {
  checkin_at_door: number;
  expected_guest_count: number;
  created_at: string;
  updated_at: string;
}

export default HomeScreen;
