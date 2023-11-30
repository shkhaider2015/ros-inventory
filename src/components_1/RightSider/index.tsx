"use client";
import { Button, Col, Divider, Row } from "antd";
import React, { FC } from "react";
import styles from "./RightSider.module.css";
import Image from "next/image";

const data: IItemComp[] = [
  {
    url: "https://dummyimage.com/600x400/598bff/fff",
    title: "High top",
    desc: "There are many variations of passages of Lorem Ipsum .....",
  },
  {
    url: "https://dummyimage.com/600x400/59ffbf/fff",
    title: "Coffee table",
    desc: "There are many variations of passages of Lorem Ipsum .....",
  },
  {
    url: "https://dummyimage.com/600x400/e6ff59/fff",
    title: "Furniture",
    desc: "There are many variations of passages of Lorem Ipsum .....",
  },
  // {
  //   url: "https://dummyimage.com/600x400/ff7759/fff",
  //   title: "Chairs",
  //   desc: "There are many variations of passages of Lorem Ipsum .....",
  // },
  // {
  //   url: "https://dummyimage.com/600x400/0cc202/fff",
  //   title: "Table clothes",
  //   desc: "There are many variations of passages of Lorem Ipsum .....",
  // },
];

const RightSider = () => {
  return (
    <div className={styles.siderContainer}>
      <div className={styles.header}>
        <div>Subtotal</div>
        <div>$34.99</div>
      </div>
      <div className={styles.divider} />
      <div className={styles.itemList}>
        {data.map((item, index) => (
          <ItemComp {...item} key={item.title + index} />
        ))}
      </div>
      <div className={styles.infoText} >Shipping & taxes are calculated at checkout</div>
      <Button className={styles.proceedBtn} type={'primary'} >Proceed to Checkout</Button>
    </div>
  );
};

const ItemComp: FC<IItemComp> = (props) => {
  const { url, title, desc } = props;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageCon}>
        <Image src={url} alt="item-pic" width={60} height={60} />
      </div>
      <div className={styles.textCon}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  );
};

interface IItemComp {
  url: string;
  title: string;
  desc: string;
}

export default RightSider;
