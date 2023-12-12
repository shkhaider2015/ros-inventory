"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

const tabsData: {
  id: string;
  title: string;
}[] = [
  {
    id: "1",
    title: "General Info",
  },
  {
    id: "2",
    title: "About The Venue",
  },
  {
    id: "3",
    title: "Technical Spec",
  },
  {
    id: "4",
    title: "Food & Beverage",
  },
  {
    id: "5",
    title: "Prep Area",
  },
  {
    id: "6",
    title: "Misc",
  },
];

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");
  return (
    <div className={styles.container}>
      {tabsData.map((item) => (
        <Tab
          key={item.id}
          id={item.id}
          title={item.title}
          isSelected={selectedTab === item.id}
          onClick={() => setSelectedTab(item.id)}
        />
      ))}
    </div>
  );
};

const Tab: React.FC<ITab> = ({ title, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.tabItem} ${isSelected ? styles.selectedItem : ""}`}
      onClick={onClick}
    >
      <div className={styles.label}>{title}</div>
      <div className={`${styles.hrLine}`} />
    </div>
  );
};

interface ITab {
  id: string;
  title?: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default Tabs;
