"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import CounterButton from "../common/CounterButton";
import { useState } from "react";

const EventSupplyItem = (props: IEventSupplyItem) => {
  const { title, url, price, units, desc, updatedAt } = props;
  const [totalPrice, setTotalPrice] = useState<number>(price);

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        <Image src={url} alt="" width={150} height={150} />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.topSec}>
          {/* Top */}
          <div className={styles.leftSec}>
            <div className={styles.title}>{title}</div>
            <div className={styles.unit}>
              Unit price: <span className={styles.price}>${price}</span>
            </div>
          </div>

          <div className={styles.rightSec}>
            $<span>{totalPrice}</span>
          </div>
        </div>
        <div className={styles.middleSec}>
          {/* Middle */}
          {desc}
        </div>
        <div className={styles.bottomSec}>
          {/* Bottom */}
          <div className={styles.bottomLeftSec}>
            <div className={styles.bottomLeftUnit}>
              Units Available: <span>{units}</span>{" "}
            </div>
            <div className={styles.bottomLeftUpdate}>{updatedAt}</div>
          </div>
          <div className={styles.bottomRightSec}>
            <CounterButton
              width={150}
              onChange={(val) => {
                setTotalPrice(val * price);
              }}
              maxValue={units}
            />
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IEventSupplyItem {
  title: string;
  url: string;
  price: number;
  units: number;
  desc: string;
  updatedAt: string;
}

export default EventSupplyItem;
