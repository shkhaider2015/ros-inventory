"use client";
import { Button, Image } from "antd";
import styles from "./styles.module.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const DisplayItem = ({ url, title, price, desc }: IDisplayItem) => {
    const [itemCount, setItemCount] = useState(1);

    const _increment = () => setItemCount(pS => pS + 1)
    const _decrement = () => setItemCount(pS => pS > 1 ? pS - 1 : 1)

  return (
    <div className={styles.ESContainer}>
      <div className={styles.imgCon}>
        <Image src={url} width={140} height={140} />
      </div>
      <div className={styles.textCon}>
        <div className={styles.topTextCon}>
          <div className={styles.title}>{title}</div>
          <div className={styles.price}>${price}</div>
        </div>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.btnCon}>
          <div className={styles.incrementBtns}>
            <div className={styles.dicrementBtn} onClick={_decrement} >
              <MinusOutlined />
            </div>
            <span className={styles.count}>{itemCount}</span>
            <div className={styles.incrementBtn} onClick={_increment} >
              <PlusOutlined />
            </div>
          </div>
          <Button type="primary" className={styles.addToCartBtn}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

interface IDisplayItem {
  url: string;
  title: string;
  price: string;
  desc: string;
}

export default DisplayItem;
