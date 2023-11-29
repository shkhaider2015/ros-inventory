"use client";
import { Col, Row, Tabs, TabsProps } from "antd";
import styles from "./TabsNavigation.module.css";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/constants";
import { useEffect, useLayoutEffect, useState } from "react";

const TabNavigations:React.FC<ITabNavigation> = ({ setPageTitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("1");

  useLayoutEffect(() => {
    let pathnames: string[] = pathname.split("/");

    switch (pathnames[pathnames.length - 1]) {
      case routes.FULL_VIEW:
        setActiveTab("1");
        setPageTitle("Preview")
        break;
      case routes.CLIENT_VENUE_PORTAL:
        setPageTitle(toTitleCase(routes.CLIENT_VENUE_PORTAL))
        setActiveTab("2");
        break;
      case routes.EVENT_SUPPLY:
        setPageTitle(toTitleCase(routes.EVENT_SUPPLY))
        setActiveTab("3");
        break;
      case routes.TECHNICAL_SPEC:
        setActiveTab("4");
        setPageTitle(toTitleCase(routes.TECHNICAL_SPEC))
        break;
      case routes.KITCHEN_SUPPLY:
        setPageTitle(toTitleCase(routes.KITCHEN_SUPPLY))
        setActiveTab("5");
        break;
      case routes.INSURANCE_REQUIREMENTS:
        setPageTitle(toTitleCase(routes.INSURANCE_REQUIREMENTS))
        setActiveTab("6");
        break;
      default:
        console.log("default ", pathnames);
        break;
    }
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Full View",
    },
    {
      key: "2",
      label: "Client Venue Portal",
    },
    {
      key: "3",
      label: "Event Supply",
    },
    {
      key: "4",
      label: "Technical spec",
    },
    {
      key: "5",
      label: "Kitchen supply",
    },
    {
      key: "6",
      label: "Insurance requirement",
    },
  ];

  const _onChange = (activeKey: string) => {
    console.log("Active Key : ", activeKey);
    setActiveTab(activeKey);
    switch (activeKey) {
      case "1":
        setPageTitle("Preview")
        router.push("/");
        break;
      case "2":
        setPageTitle(toTitleCase(routes.CLIENT_VENUE_PORTAL))
        router.push(routes.CLIENT_VENUE_PORTAL);
        break;
      case "3":
        setPageTitle(toTitleCase(routes.EVENT_SUPPLY))
        router.push(routes.EVENT_SUPPLY);
        break;
      case "4":
        setPageTitle(toTitleCase(routes.TECHNICAL_SPEC))
        router.push(routes.TECHNICAL_SPEC);
        break;
      case "5":
        setPageTitle(toTitleCase(routes.KITCHEN_SUPPLY))
        router.push(routes.KITCHEN_SUPPLY);
        break;
      case "6":
        setPageTitle(toTitleCase(routes.INSURANCE_REQUIREMENTS))
        router.push(routes.INSURANCE_REQUIREMENTS);
        break;
      default:
        break;
    }
  };

  return (
    <Row className={styles.container}>
      <Col span={24}>
        <Tabs
          className={styles.mainTabs}
          defaultActiveKey={"1"}
          activeKey={activeTab}
          items={items}
          onChange={_onChange}
        />
      </Col>
    </Row>
  );
};

interface ITabNavigation {
  setPageTitle: React.Dispatch<React.SetStateAction<string>>
}

const toTitleCase = (str:string) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, firstChar => firstChar.toUpperCase());
}

export default TabNavigations;
