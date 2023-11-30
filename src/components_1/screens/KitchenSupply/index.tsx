"use client"
import { Element } from "react-scroll";
import styles from "./styles.module.css";
import { routes } from "@/lib/constants";
import DisplayItem from "@/components_1/ItemDisplay";

const data: {
  url: string;
  title: string;
  price: string;
  desc: string;
}[] = [
  {
    url: "https://dummyimage.com/600x400/c28100/fff",
    title: "Stove",
    price: "67.94",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
  {
    url: "https://dummyimage.com/600x400/00c23a/fff",
    title: "Coock Top",
    price: "12.00",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
];

const KitchenSupplyScreen = () => {
  return (
    <Element name={routes.KITCHEN_SUPPLY} className={styles.element}>
      <div className={styles.container}>
        {data.map((item, index) => <DisplayItem {...item} key={item.title + index} /> )}
      </div>
    </Element>
  );
};

export default KitchenSupplyScreen;
