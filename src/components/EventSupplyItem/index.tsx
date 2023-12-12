"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/checkedItems";
import { Image_URL_Base } from "@/lib/constants";

const EventSupplyItem = (props: IInventoryItem) => {
  const { name, icon_url, rental_price, quantity, description, updated_at, id } = props;
  const cartItems = useSelector((state: any) => state.cart);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(rental_price);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  useLayoutEffect(() => {
    if(cartItems?.some((item:any) => item?.id === id)) setIsAdded(true);
    else setIsAdded(false)
  }, [cartItems])

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        <Image src={Image_URL_Base + icon_url || ''} alt="" width={150} height={150} />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.topSec}>
          {/* Top */}
          <div className={styles.leftSec}>
            <div className={styles.title}>{name}</div>
            <div className={styles.unit}>
              Unit price: <span className={styles.price}>${rental_price}</span>
            </div>
          </div>

          <div className={styles.rightSec}>
            $<span>{selectedQuantity * rental_price}</span>
          </div>
        </div>
        <div className={styles.middleSec}>
          {/* Middle */}
          {description}
        </div>
        <div className={styles.bottomSec}>
          {/* Bottom */}
          <div className={styles.bottomLeftSec}>
            <div className={styles.bottomLeftUnit}>
              Units Available: <span>{quantity}</span>{" "}
            </div>
            <div className={styles.bottomLeftUpdate}>{updated_at}</div>
          </div>
          <div className={styles.bottomRightSec}>
            <CounterButton
              width={150}
              onChange={(val) => {
                setSelectedQuantity(val);
              }}
              maxValue={quantity}
              disable={isAdded}
            />
            <div>
              <Button label="Add to cart" disable={isAdded} onClick={() => {
                dispatch(addToCart({...props, selectedQuantity}))
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default EventSupplyItem;
