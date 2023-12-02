import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import Button from "../common/Button";

const CheckedOut = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topSec}>
        <div>Subtotal</div>
        <div>
          Total <span className={styles.totalPrice}>$34.99</span>
        </div>
      </div>
      {data.map((item, index) => (
        <>
          <div className={styles.hrLine} />
          <Item {...item} key={item.title + index} />
        </>
      ))}
      {/* <div className={styles.hrLine} />
      <Item />
      <div className={styles.hrLine} />
      <Item />
      <div className={styles.hrLine} />
      <Item /> */}
      <div className={styles.shippingTex}>
        Shipping & taxes are calculated later
      </div>
      <Button label="Save" type="Primary" />
      <div className={styles.bottomSec}>
        <Image
          src={"/images/icons/tick-circle.svg"}
          alt="thick"
          width={25}
          height={25}
        />
        Last Saved: Nov 15, 2023 - 11:00PM GST
      </div>
    </div>
  );
};

const Item = ({ url, title, desc }: IItem) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemTopSec}>
        <div className={styles.imageCon}>
          <Image src={url} alt="product" width={60} height={60} />
        </div>
        <div className={styles.textCon}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>
            {desc.length > 62 ? desc.slice(0, 62) + "..." : desc}
          </div>
        </div>
      </div>
      <div className={styles.itemBottomSec}>
        <div className={styles.emptyDiv} />
        <div className={styles.counterBtn} >
          <CounterButton />
        </div>
        <div className={styles.deletCon}>
          <div className={styles.deleteIcon}>
            <Image
              src={"/images/icons/delete.svg"}
              alt="delete"
              width={22}
              height={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const data: IItem[] = [
  {
    url: "/images/dummy/Rectangle 25229.png",
    title: "Coffee Table ",
    desc: "There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available",
  },
  {
    url: "/images/dummy/Rectangle 25229 (1).png",
    title: "Coffee Table ",
    desc: "There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available",
  },
  {
    url: "/images/dummy/Rectangle 25229 (2).png",
    title: "Sofa Set",
    desc: "There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available",
  },
];

interface IItem {
  url: string;
  title: string;
  desc: string;
}

export default CheckedOut;
