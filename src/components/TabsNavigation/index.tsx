"use client";
import { Col, Row, Tabs, TabsProps } from "antd";
import styles from "./TabsNavigation.module.css";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/constants";
import { useEffect, useState } from "react";

const TabNavigations = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    let pathnames: string[] = pathname.split("/");

    console.log(
      "OPath Name : ",
      pathnames[pathnames.length - 1] === routes.CLIENT_VENUE_PORTAL
    );

    switch (pathnames[pathnames.length - 1]) {
      case routes.FULL_VIEW:
        console.log("Full View");
        setActiveTab("1");
        break;
      case routes.CLIENT_VENUE_PORTAL:
        console.log("Portal");
        setActiveTab("2");
        break;
      case routes.EVENT_SUPPLY:
        console.log("Chain");
        setActiveTab("3");
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
    setActiveTab(activeKey)
    switch (activeKey) {
      case "1":
        router.push("/");
        break;
      case "2":
        router.push(routes.CLIENT_VENUE_PORTAL);
        break;
      case "3":
        router.push(routes.EVENT_SUPPLY);
        break;
      case "4":
        router.push(routes.TECHNICAL_SPEC);
        break;
      case "5":
        router.push(routes.KITCHEN_SUPPLY);
        break;
      case "6":
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
  _onChangeTabs: (value: string) => void;
}

export default TabNavigations;
