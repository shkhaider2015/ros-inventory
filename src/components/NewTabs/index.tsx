"use client";
import React, { useState, useRef, useCallback } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import myImage from "../NewTabs/arrow-right.svg";
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
    title: "Signed Docs",
  },
  {
    id: "7",
    title: "Insurance Requirements",
  },
  {
    id: "8",
    title: "Food & Beverage",
  },
  {
    id: "9",
    title: "Misc",
  },
];

const NewTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const _onSelectTab = useCallback((id: string) => {
    setSelectedTab(id);
    scroller.scrollTo(`scrollto_${id}`, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -140,
    });
  }, []);

  const scrollRight = () => {
    console.log("Scroll right button clicked");
    if (scrollContainerRef.current) {
      // scrollContainerRef.current.scrollLeft += 200; // Adjust the scroll value as needed
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs} ref={scrollContainerRef}>
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

      <button className={styles.next} onClick={scrollRight}>
        <Image
          src={"/images/icons/arrow-right.svg"}
          alt="Arrow Right"
          width={25}
          height={25}
          // layout="contain"
          // objectFit="contain"
        />
      </button>
    </div>
  );
};

interface ITabProps {
  id: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const Tab: React.FC<ITabProps> = ({ id, title, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.tabItem} ${isSelected ? styles.selectedItem : ""}`}
      onClick={onClick}
    >
      <div
        className={`${styles.label} ${isSelected ? styles.selectedLabel : ""}`}
      >
        {title}
      </div>
    </div>
  );
};

export default NewTabs;
