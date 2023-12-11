"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/features/checkedItems";

const CheckedOut = () => {
  const cartItems = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.topSec}>
        <div>Subtotal</div>
        <div>
          Total <span className={styles.totalPrice}>$34.99</span>
        </div>
      </div>
      {cartItems?.map((item: any) => (
        <>
          <div className={styles.hrLine} />
          <Item {...item} key={item?.id} onRemove={() => {
            console.log("Remove call");
            dispatch(removeFromCart(item?.id))
            }} />
        </>
      ))}
      {/* {data.map((item, index) => (
        <>
          <div className={styles.hrLine} />
          <Item {...item} key={item.title + index} />
        </>
      ))} */}
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

const Item = ({ url, title, desc, onRemove }: any) => {
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
        <div className={styles.counterBtn}>
          <CounterButton />
        </div>
        <div className={styles.deletCon}>
          <div className={styles.deleteIcon} onClick={() => onRemove()}>
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


interface IItem {

  url: string;
  title: string;
  desc: string;
}

export default CheckedOut;
