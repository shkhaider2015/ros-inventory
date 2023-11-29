import { Button, Image } from "antd";
import styles from "./styles.module.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import DisplayItem from "@/components/ItemDisplay";

const data: {
  url: string;
  title: string;
  price: string;
  desc: string;
}[] = [
  {
    url: "https://dummyimage.com/600x400/c28100/fff",
    title: "High Top",
    price: "67.94",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
  {
    url: "https://dummyimage.com/600x400/00c23a/fff",
    title: "Coffee table",
    price: "12.00",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
  {
    url: "https://dummyimage.com/600x400/003ac2/fff",
    title: "Chairs",
    price: "67.94",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
  {
    url: "https://dummyimage.com/600x400/8100c2/fff",
    title: "Office table",
    price: "12.00",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
  {
    url: "https://dummyimage.com/600x400/c20071/fff",
    title: "Table clothes",
    price: "67.94",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  },
];

const EventSupplyScreen = () => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <DisplayItem {...item} key={item.title + index} />
      ))}
    </div>
  );
};

export default EventSupplyScreen;
