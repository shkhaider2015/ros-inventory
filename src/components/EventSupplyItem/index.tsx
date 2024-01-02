"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/checkedItems";
import { _toTitleCase } from "@/lib/func";
import { IInventoryItem } from "@/screens/Home";

const EventSupplyItem = (props: IInventoryItem) => {
  const {
    name,
    icon_url,
    rental_price,
    quantity,
    description,
    updated_at,
    id,
  } = props;
  const cartItems = useSelector((state: any) => state.cart);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  // useLayoutEffect(() => {
  //   if(cartItems?.some((item:any) => item?.id === id)) setIsAdded(true);
  //   else setIsAdded(false)

  // }, [cartItems])

  useLayoutEffect(() => {
    let currentItem: any = cartItems?.find((item: any) => item?.id === id);
    if (currentItem) {
      setIsAdded(true);
      setSelectedQuantity(currentItem?.selectedQuantity);
    } else {
      setIsAdded(false);
      setSelectedQuantity(0);
    }
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        <Image
          src={icon_url || ""}
          alt=""
          width={150}
          height={150}
          style={{ borderRadius: 10 }}
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.topSec}>
          {/* Top */}
          <div className={styles.leftSec}>
            <div className={styles.title}>{_toTitleCase(name)}</div>
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
              Units Available: <span>{quantity - selectedQuantity}</span>{" "}
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
              minValue={0}
              disable={isAdded}
              value={selectedQuantity}
            />
            <div>
              <Button
                label="Add to cart"
                disable={isAdded}
                onClick={() => {
                  dispatch(addToCart({ ...props, selectedQuantity }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// interface IInventoryItem {
//   description: string;
//   icon_url: string | undefined;
//   id: string;
//   name: string;
//   quantity: number;
//   rental_price: number;
//   type:
//     | "INVENTORY_MENU"
//     | "VENUE_SPEC"
//     | "KITCHEN_SUPPLY"
//     | "ABOUT_THE_VENUE"
//     | "INSURANCE_REQUIREMENTS"
//     | "FOOD_AND_BEVERAGE"
//     | "MISC";
//   workspace_id?: string;
//   updated_at?: string;
// }

export default EventSupplyItem;
