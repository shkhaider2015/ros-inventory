"use client";
import Image from "next/image";
import styles from "./inventoryDetails.module.css";
import TextEditor from "../TextEditor";
import { _toTitleCase } from "@/lib/func";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ROSModal from "../common/ROSModal";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { EnvironmentOutlined } from "@ant-design/icons";

const InventoryDetails = (props: IInventoryDetails) => {
  const { info, contacts } = props;
  const [showDetails, setShowDetails] = useState(false);

  const formFields = useSelector((state: any) => state.formFields);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    console.log(formFields.isFormFieldsChanged, "formFieldsChanged");
    if (router) {
      const handleBeforeUnload = (e: any) => {
        if (formFields.isFormFieldsChanged) {
          e.preventDefault();
          e.returnValue =
            "Are you sure you want to exit? All changes you have made will be lost!";
        }
      };

      // tab close
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [router, formFields, pathName]);

  return (
    <div className={styles.container}>
      <div className={styles.headSec}>
        <div className={styles.imageCon}>
          <Image
            src={info.logo_url || ""}
            alt="inventory picture"
            width={250}
            height={220}
            // layout="responsive"
            style={{ borderRadius: 10 }}
          />
        </div>
        <div className={`${styles.textCon}`}>
          <div className={styles.topText}>Event Operation and Logistics</div>
          <ContactsListing className={styles.forDesktop}  contacts={contacts} />
          {contacts.length > 3 && <div className={styles.contactShadow} />}
        </div>
      </div>

      {/* <div className={`${styles.textConMobile}`}> */}
        <ContactsListing className={styles.forMobile} contacts={contacts} />
        {contacts.length > 3 && <div className={styles.contactShadow} />}
      {/* </div> */}

      <div className={styles.address_field} >
      <span>
        <EnvironmentOutlined style={{ color: '#6200EE' }} />
      </span>
      <span className={styles.address_field_text} >{info.secondary_email_address}</span>
      </div>
      <div className={styles.detailsSec}>
        <TextEditor value={info.description} isReadOnly />
      </div>
      <div className={styles.detailsShadow} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {info.description && (
          <div className={styles.thirdRow} onClick={() => setShowDetails(true)}>
            <div className={styles.title}>View Details</div>
            <Image
              src={"/images/icons/arrow-up.svg"}
              alt="arrow"
              width={22}
              height={22}
            />
          </div>
        )}
      </div>

      <ROSModal open={showDetails} onClose={() => setShowDetails(false)}>
        <div className={styles.inventoryModalContainer}>
          {/* <div className={styles.dsModalTitle} >Title</div> */}
          {/* <div className={styles.inventoryModalContent}> */}
          <TextEditor value={info.description} isReadOnly={true} />
          {/* </div> */}
        </div>
      </ROSModal>
    </div>
  );
};

const ContactsListing: React.FC<{ contacts: IContactList[], className?: string }> = ({
  contacts,
  className
}) => {
  return (
    <div
      className={`${styles.containerListing} ${className} ${
        contacts.length > 3 ? styles.containerListingPadding : ""
      } `}
    >
      <table>
        <tbody>
          {contacts.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.iconTextCon}>
                  <Image
                    src={"/images/icons/User_Rounded.svg"}
                    alt="phone call"
                    className={styles.iconIcon}
                    width={22}
                    height={22}
                  />
                  <span className={styles.iconsText}>{`${_toTitleCase(
                    item.name
                  )}`}</span>
                </div>
              </td>
              <td>
                {item.title && (
                  <div className={styles.iconTextCon}>
                    <Image
                      src={"/images/icons/Lable.svg"}
                      alt="phone call"
                      className={styles.iconIcon}
                      width={22}
                      height={22}
                    />
                    <span className={styles.iconsText}>{`${_toTitleCase(
                      item.title
                    )} `}</span>
                  </div>
                )}
              </td>
              <td>
                <div className={styles.iconTextCon}>
                  <Image
                    src={"/images/icons/PhoneCallingRounded.svg"}
                    alt="phone call"
                    className={styles.iconIcon}
                    width={22}
                    height={22}
                  />
                  <a className={styles.iconsText} href={`tel:${item.phone_number}`} >{item.phone_number}</a>
                </div>
              </td>
              <td>
                <div className={styles.iconTextCon}>
                  <Image
                    src={"/images/icons/email.svg"}
                    alt="phone call"
                    className={styles.iconIcon}
                    width={22}
                    height={22}
                  />
                  <a className={styles.iconsText} href={`mailto:${item.email}`} >{item.email}</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  title: string;
  phone_number: string;
  email: string;
}

export default InventoryDetails;

// const handleRouteChange = (url: string) => {
//   if (
//     url !== "/" &&
//     pathName !== url &&
//     !isSaved &&
//     isFormFieldsChanged
//   ) {
//     open({
//       message: "Are you sure you want to exit? All changes will be lost!",
//       onOk: async () => {
//         router.push(url);
//       },
//     });

//     // prevent navigation
//     return false;
//   }
// };
