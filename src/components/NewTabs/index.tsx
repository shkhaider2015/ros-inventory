
"use client";
import React, { useState, useRef, useCallback } from "react";
import styles from "./styles.module.css";
<<<<<<< HEAD
import Image from 'next/image';
import myImage from "public/images/icons/arrow-right.svg";
import { Link} from 'react-scroll';
=======
import Image from "next/image";
import myImage from "../NewTabs/arrow-right.svg";
import { scroller } from "react-scroll";
>>>>>>> b9ec20500b5d101ed2be7ef1723a50268a4f56c0

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
<<<<<<< HEAD
    title: "Venue Specification",
=======
    title: "Venue Specifications",
>>>>>>> b9ec20500b5d101ed2be7ef1723a50268a4f56c0
  },
  {
    id: "5",
    title: "Kitchen Supply",
  },
  {
    id: "6",
<<<<<<< HEAD
    title: "Insurance Requirements",
  },
  {
    id: "7",
    title: "Food & Beverage",
  },
  {
    id: "8",
=======
    title: "Agreement",
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
>>>>>>> b9ec20500b5d101ed2be7ef1723a50268a4f56c0
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
          <Link
            key={item.id}
            activeClass={styles.selectedItem}
            to={`scrollto_${item.id}`}
            spy={true}
            smooth={true}
            offset={-70}
            duration={1500}
          >
            <Tab
              id={item.id}
              title={item.title}
              isSelected={selectedTab === item.id}
              onClick={() => _onSelectTab(item.id)}
            />
          </Link>
        ))}
      </div>

      <button className={styles.next} onClick={scrollRight}>
<<<<<<< HEAD
        <Image src={myImage} alt="Arrow Right" layout="contain" objectFit="contain" />
=======
        <Image
          src={"/images/icons/arrow-right.svg"}
          alt="Arrow Right"
          width={25}
          height={25}
          // layout="contain"
          // objectFit="contain"
        />
>>>>>>> b9ec20500b5d101ed2be7ef1723a50268a4f56c0
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
