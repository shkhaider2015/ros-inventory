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
import ROSCarousel from "../common/ROSCarousel";
import { updateFormFields } from "@/store/features/formFields";

const images: string[] = [
  "https://dummyimage.com/1200x800/d99400/fff&text=Carousel",
  "https://dummyimage.com/1200x800/0bd900/fff&text=Carousel",
  "https://dummyimage.com/1200x800/0050d9/fff&text=Carousel",
  "https://dummyimage.com/1200x800/d90019/fff&text=Carousel",
  "https://dummyimage.com/1200x800/db00db/fff&text=Carousel",
  "https://dummyimage.com/1200x800/00d9ce/fff&text=Carousel",
];

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
  const formFields = useSelector((state: any) => state.formFields);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);

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

  // console.log("Current Index : ", currentIndex);

  return (
    <div className={styles.container}>
      <div className={styles.leftCol} onClick={() => setShowCarousel(true)}>
        {props.additional_images &&
          props.additional_images.images &&
          props.additional_images.images.length > 1 && (
            <div className={styles.multiImageIconCon}>
              <Image
                src={"/images/icons/Copy_light.svg"}
                width={20}
                height={20}
                alt="copy icon"
              />
            </div>
          )}
        <div className={styles.animatedDev} />
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
                if (!formFields.isFormFieldsChanged) {
                  dispatch(updateFormFields({ isFormFieldsChanged: true }));
                }
              }}
              maxValue={quantity}
              minValue={0}
              disable={isAdded}
              value={selectedQuantity}
            />
            <div>
              <Button
                label={isAdded ? "Edit in cart" : "Add to cart"}
                disable={isAdded}
                onClick={() => {
                  dispatch(addToCart({ ...props, selectedQuantity }));
                  if (!formFields.isFormFieldsChanged) {
                    dispatch(updateFormFields({ isFormFieldsChanged: true }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ROSCarousel
        open={showCarousel}
        onClose={() => setShowCarousel(false)}
        images={
          props.additional_images &&
          props.additional_images.images &&
          props.additional_images.images.length
            ? props.additional_images.images
            : icon_url
            ? [icon_url]
            : [""]
        }
      />
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
