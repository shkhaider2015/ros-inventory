"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/features/checkedItems";
import { _toTitleCase } from "@/lib/func";

const CheckedOut = () => {
  const cartItems: IItem[] = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  // console.log("Cart Items : ", cartItems);

  return (
    <div className={styles.container}>
      <div className={styles.topSec}>
        <div>Subtotal</div>
        <div>
          Total{" "}
          <span className={styles.totalPrice}>
            $
            {cartItems.reduce(
              (sum, item) => sum + item.rental_price * item.selectedQuantity,
              0
            )}{" "}
          </span>
        </div>
      </div>
      {cartItems?.map((item: IItem) => (
        <div className={styles.lineAndItem} key={item?.id} >
          <div className={styles.hrLine} />
          <Item
            {...item}
            onRemove={() => {
              console.log("Remove call");
              dispatch(removeFromCart(item?.id));
            }}
            onChangeCounter={(val:number) =>  {
              dispatch(updateQuantity({...item, selectedQuantity: val}))
            }}
          />
        </div>
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
          style={{ borderRadius: 10 }}
        />
        Last Saved: Nov 15, 2023 - 11:00PM GST
      </div>
    </div>
  );
};

const Item = ({
  icon_url,
  name,
  description,
  selectedQuantity,
  onRemove,
  onChangeCounter,
}: any) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemTopSec}>
        <div className={styles.imageCon}>
          <Image src={icon_url || ""} alt="product" width={60} height={60} />
        </div>
        <div className={styles.textCon}>
          <div className={styles.title}>{_toTitleCase(name)}</div>
          <div className={styles.desc}>
            {description.length > 62
              ? description.slice(0, 62) + "..."
              : description}
          </div>
        </div>
      </div>
      <div className={styles.itemBottomSec}>
        <div className={styles.emptyDiv} />
        <div className={styles.counterBtn}>
          <CounterButton value={selectedQuantity} onChange={onChangeCounter} />
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
  description: string;
  icon_url: string | undefined;
  id: string;
  name: string;
  quantity: number;
  rental_price: number;
  type: "INVENTORY_MENU" | "VENUE_SPEC" | "KITCHEN_SUPPLY";
  workspace_id?: string;
  updated_at?: string;
  selectedQuantity: number;
}

export default CheckedOut;
