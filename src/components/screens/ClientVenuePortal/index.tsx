import styles from "./styles.module.css";
import { Image } from "antd";

const data: {
  url: string;
  title: string;
  desc: string;
  address: string;
  contactNo: string;
  email: string;
} = {
  url: "https://dummyimage.com/1100x800/0081b8/fff",
  title: "Inventory & Specifications Deck",
  desc: "it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.",
  address: "Avenue 56 #67265 Austin, Texas, USA",
  contactNo: "+1562375364",
  email: "ctas@gmail.com",
};

const ClientVenuePortalScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageCon}>
        <Image
          src={data.url}
          className={styles.image}
          width={'100%'}
          height={350}
        />
      </div>
      <div className={styles.textCon}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.desc}>{data.desc}</div>
        <div className={styles.hrLine} />
        <div className={styles.detail}>{data.address}</div>
        <div className={styles.hrLine} />
        <div className={styles.detail}>{data.contactNo}</div>
        <div className={styles.hrLine} />
        <div className={styles.detail}>{data.email}</div>
      </div>
    </div>
  );
};

export default ClientVenuePortalScreen;
