"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import TextEditor from "../TextEditor";

const InventoryDetails = (props: IInventoryDetails) => {
  const { info, contacts } = props;
  // console.log("Props : ", props);

  return (
    <div className={styles.container}>
      <div className={styles.headSec}>
        <div className={styles.imageCon}>
          <Image
            src={info.logo_url || ""}
            alt="inventory picture"
            width={120}
            height={120}
            style={{ borderRadius: 10 }}
          />
        </div>
        <div className={styles.textCon}>
          <div className={styles.topText}>Inventory & Specifications Deck</div>
          <ContactsListing contacts={contacts} />
          {contacts.length > 3 && <div className={styles.contactShadow} />}
          

          {/* <div className={styles.bottomText}>
            <div className={styles.iconTextCon}>
              <Image
                src={"/images/icons/PhoneCallingRounded.svg"}
                alt="phone call"
                className={styles.iconIcon}
                width={22}
                height={22}
              />
              <span className={styles.iconsText}>
                {props.secondary_phone_number}
              </span>
            </div>
            <div className={styles.iconTextCon}>
              <Image
                src={"/images/icons/email.svg"}
                alt="phone call"
                className={styles.iconIcon}
                width={22}
                height={22}
              />
              <span className={styles.iconsText}>{props.email_address}</span>
            </div>
            <div className={styles.iconTextCon}>
              <Image
                src={"/images/icons/location.svg"}
                alt="phone call"
                className={styles.iconIcon}
                width={22}
                height={22}
              />
              <span className={styles.iconsText}>
                Avenue 56 #67265 Austin, Texas, USA
              </span>
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.detailsSec}>
        <TextEditor value={info.description} isReadOnly />
      </div>
      <div className={styles.detailsShadow} />
    </div>
  );
};

const ContactsListing: React.FC<{ contacts: IContactList[] }> = ({
  contacts,
}) => {
  return (
    <div className={`${styles.containerListing} ${contacts.length > 3 ? styles.containerListingPadding : "" } `}>
      {contacts.map((item) => (
        <div key={item.id} className={styles.bottomText}>
          <div className={styles.iconTextCon}>
            <Image
              src={"/images/icons/User_Rounded.svg"}
              alt="phone call"
              className={styles.iconIcon}
              width={22}
              height={22}
            />
            <span className={styles.iconsText}>{item.name}</span>
          </div>
          <div className={styles.iconTextCon}>
            <Image
              src={"/images/icons/PhoneCallingRounded.svg"}
              alt="phone call"
              className={styles.iconIcon}
              width={22}
              height={22}
            />
            <span className={styles.iconsText}>{item.phone_number}</span>
          </div>
          <div className={styles.iconTextCon}>
            <Image
              src={"/images/icons/email.svg"}
              alt="phone call"
              className={styles.iconIcon}
              width={22}
              height={22}
            />
            <span className={styles.iconsText}>{item.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

interface IInventoryDetails {
  info: IInventoryInfo;
  contacts: IContactList[];
}

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

interface IContactList {
  id: string;
  name: string;
  phone_number: string;
  email: string;
}

export default InventoryDetails;
