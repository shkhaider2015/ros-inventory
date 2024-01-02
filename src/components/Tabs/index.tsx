"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { scroller } from "react-scroll";

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
    title: "Event Supply",
  },
  {
    id: "4",
    title: "Venue Specifications",
  },
  {
    id: "5",
    title: "Kitchen Supply",
  },
  {
    id: "6",
    title: "Insurance Requirements",
  },
  {
    id: "7",
    title: "Food & Beverage",
  },
  {
    id: "8",
    title: "Misc",
  },
];


const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const _onSelectTab = (id: string) => {
    setSelectedTab(id);
    scroller.scrollTo(`scrollto_${id}`, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -70,
    });
  };

  return (
    <div className={styles.container}>
      {tabsData.map((item) => (
        <Tab
          key={item.id}
          id={item.id}
          title={item.title}
          isSelected={selectedTab === item.id}
          onClick={() => _onSelectTab(item.id)}
        />
      ))}
    </div>
  );
};

const Tab: React.FC<ITab> = ({ title, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.tabItem}`}
      onClick={onClick}
    >
      <div className={`${styles.label} ${isSelected ? styles.selectedLabel : ""} `}>{title}</div>
      <div className={`${styles.hrLine} ${isSelected ? styles.selectedLine : "" } `} />
      
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
