"use client";
import { Col, Row, Tabs, TabsProps } from "antd";
import styles from "./TabsNavigation.module.css";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/constants";
import { useEffect, useLayoutEffect, useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import { Link, scroller } from "react-scroll";
import Item from "antd/es/list/Item";
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
const TabNavigations: React.FC<ITabNavigation> = ({ setPageTitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("1");

  useLayoutEffect(() => {
    let pathnames: string[] = pathname.split("/");

    switch (pathnames[pathnames.length - 1]) {
      case routes.FULL_VIEW:
        setActiveTab("1");
        setPageTitle("Preview");
        scrollTo(routes.FULL_VIEW)
        break;
      case routes.CLIENT_VENUE_PORTAL:
        setPageTitle(toTitleCase(routes.CLIENT_VENUE_PORTAL));
        setActiveTab("2");
        scrollTo(routes.FULL_VIEW)
        break;
      case routes.EVENT_SUPPLY:
        setPageTitle(toTitleCase(routes.EVENT_SUPPLY));
        setActiveTab("3");
        scrollTo(routes.FULL_VIEW)
        break;
      case routes.TECHNICAL_SPEC:
        setActiveTab("4");
        setPageTitle(toTitleCase(routes.TECHNICAL_SPEC));
        break;
      case routes.KITCHEN_SUPPLY:
        setPageTitle(toTitleCase(routes.KITCHEN_SUPPLY));
        setActiveTab("5");
        scrollTo(routes.KITCHEN_SUPPLY)
        break;
      case routes.INSURANCE_REQUIREMENTS:
        setPageTitle(toTitleCase(routes.INSURANCE_REQUIREMENTS));
        setActiveTab("6");
        break;
      default:
        console.log("default ", pathnames);
        break;
    }
  }, []);


  const scrollTo = (position:string, offset:number=0) => {
    scroller.scrollTo(position, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: offset
    });
  }


  const _onChange = (activeKey: string) => {
    console.log("Active Key : ", activeKey);
    setActiveTab(activeKey);
    switch (activeKey) {
      case "1":
        setPageTitle("Preview");
        scrollTo(routes.FULL_VIEW)
        // router.push("/");
        break;
      case "2":
        setPageTitle(toTitleCase(routes.CLIENT_VENUE_PORTAL));
        scrollTo(routes.CLIENT_VENUE_PORTAL)
        // router.push(routes.CLIENT_VENUE_PORTAL);
        break;
      case "3":
        setPageTitle(toTitleCase(routes.EVENT_SUPPLY));
        scrollTo(routes.EVENT_SUPPLY)
        // router.push(routes.EVENT_SUPPLY);
        break;
      case "4":
        setPageTitle(toTitleCase(routes.TECHNICAL_SPEC));
        scrollTo(routes.TECHNICAL_SPEC)
        // router.push(routes.TECHNICAL_SPEC);
        break;
      case "5":
        setPageTitle(toTitleCase(routes.KITCHEN_SUPPLY));
        scrollTo(routes.KITCHEN_SUPPLY)
        // router.push(routes.KITCHEN_SUPPLY);
        break;
      case "6":
        setPageTitle(toTitleCase(routes.INSURANCE_REQUIREMENTS));
        // router.push(routes.INSURANCE_REQUIREMENTS);
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
        <Link
          activeClass={`"active-tab"`}
          to={routes.KITCHEN_SUPPLY}
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          Link To Kitchen
        </Link>
        {/* <Tabs defaultActiveKey="1" style={{ display: "flex", color: 'black' }}>
          {items.map((item) => (
            <Item key={item.key}>
              <Link
                activeClass={``}
                to={routes.EVENT_SUPPLY}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                {item.label}
              </Link>
            </Item>
          ))}
        </Tabs> */}
      </Col>
    </Row>
  );
};

interface ITabNavigation {
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
};

export default TabNavigations;
