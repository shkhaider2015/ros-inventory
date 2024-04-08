"use client";
import Image from "next/image";
import styles from "./CheckedOut.module.css";
import CounterButton from "../common/CounterButton";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeData,
  removeFromCart,
  updateQuantity,
} from "@/store/features/checkedItems";
import { updateFormFields } from "@/store/features/formFields";
import { _toTitleCase } from "@/lib/func";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import WarningModal from "../common/WarningModal";
import useModal from "@/hooks/useModal";
import {message} from 'antd';

const CheckedOut: React.FC<{
  event_id: string;
  initialData: IItem[];
  updated_at: string;
}> = (props) => {
  const cartItems: IItem[] = useSelector((state: any) => state.cart);
  const formFields = useSelector((state: any) => state.formFields);
  const guestInfo: any = useSelector((state: any) => state.guestInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState<{
    main_id: string;
    cart_id: string | undefined;
  }>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { open } = useModal();

  // console.log("Cart Items : ", props.initialData);

  useEffect(() => {
    if (props.initialData && props.initialData?.length) {
      dispatch(initializeData(props.initialData));
    }
  }, [props.initialData]);

  const _onSave = async () => {
    // console.log("_onSave() : ", cartItems);

    let data: any = {
      ...guestInfo,
      event_id: props.event_id,
    };
    data.items = cartItems.map((item) => ({
      item: item.id,
      quantity: item.selectedQuantity,
      unit_price_when_purchased: item.rental_price,
      total_price: item.selectedQuantity * item.rental_price,
    }));

    let URL = "https://myapi.runofshowapp.com/api/inventory/checkout";

    try {
      setLoading(true);
      await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (formFields.isFormFieldsChanged) {
        dispatch(updateFormFields({ isFormFieldsChanged: false }));
      }
      router.refresh();
      message.success({
        content: "Data saved successfully"
      })
    } catch (error) {
      console.log("Save api error : ", error);
      message.error({
        content: "Something went wrong"
      })
    } finally {
      setLoading(false);
    }
  };

  const _onDelete = async (
    main_item_id: string | undefined,
    cart_item_id: string | undefined
  ) => {
    let URL = "https://myapi.runofshowapp.com/api/inventory/deleteItemFromCart";

    if (!main_item_id) return;
    if (!cart_item_id) {
      dispatch(removeFromCart(main_item_id));
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        URL,
        {
          cart_item_id: cart_item_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(removeFromCart(main_item_id));
      // router.refresh()
    } catch (error) {
      console.log("Save api error : ", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("Initial Cart Items : ", props.initialData);
  // console.log("Cart Items : ", props.initialData);

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
      <div className={styles.totalItemContainer}>
        {cartItems?.map((item: IItem) => (
          <div className={styles.lineAndItem} key={item?.id}>
            <div className={styles.hrLine} />
            <Item
              {...item}
              onRemove={() => {
                // setShowDeleteWarning({main_id: item.id, cart_id: item.cart_id});
                open({
                  message: "Are you sure you want to delete this item?",
                  onOk: async () => {
                    _onDelete(item.id, item.cart_id);
                    // if (!formFields.isFormFieldsChanged) {
                    //   dispatch(updateFormFields({ isFormFieldsChanged: true }));
                    // }
                  },
                });
              }}
              onChangeCounter={(val: number) => {
                dispatch(updateQuantity({ ...item, selectedQuantity: val }));
                if (!formFields.isFormFieldsChanged) {
                  dispatch(updateFormFields({ isFormFieldsChanged: true }));
                }
              }}
            />
          </div>
        ))}
      </div>

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
      <Button
        loading={loading}
        className={styles.saveBtn}
        onClick={_onSave}
        label="Save"
        type="Primary"
      />
      <div className={styles.bottomSec}>
        <Image
          src={"/images/icons/tick-circle.svg"}
          alt="thick"
          width={25}
          height={25}
          style={{ borderRadius: 10 }}
        />
        {/* Last Saved: Nov 15, 2023 - 11:00PM GST */}
        Last Saved: {moment(props.updated_at).format("MMM DD, YYYY - hh:mmA")}
      </div>
      <WarningModal
        open={typeof showDeleteWarning !== "undefined"}
        onClose={() => setShowDeleteWarning(undefined)}
        onOk={() =>
          _onDelete(showDeleteWarning?.main_id, showDeleteWarning?.cart_id)
        }
      />
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
  quantity,
  is_deleted,
  rental_price,
}: any) => {
  
  useEffect(() => {
    if (is_deleted && selectedQuantity > 0) {
      onChangeCounter(0);
    }
  }, [is_deleted, selectedQuantity]);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemTopSec}>
        <div className={styles.imageCon}>
          <Image src={icon_url || ""} alt="product" width={60} height={60} />
        </div>
        <div className={styles.textCon}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{_toTitleCase(name)}</div>
            <div className={styles.unitPriceCon}>
              <div className={styles.unitPriceBox}>
                Unit Price:{" "}
                <span className={styles.unitPrice}>${rental_price}</span>
              </div>
            </div>
          </div>
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
          <CounterButton
            value={selectedQuantity}
            minValue={0}
            maxValue={quantity}
            onChange={onChangeCounter}
            disable={is_deleted}
          />
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
      {is_deleted && (
        <div className={styles.itemFooter}>
          This Item is no longer available
        </div>
      )}
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
  cart_id?: string;
}

export default CheckedOut;
