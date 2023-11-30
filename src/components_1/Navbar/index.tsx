import { Avatar, Col, Row } from "antd";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { QuestionCircleOutlined, TrademarkCircleOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <Row className={styles.navContainer}>
      <Col span={12} className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Image
            src={"/images/new_logo.svg"}
            alt="logo"
            width={30}
            height={30}
          />
          <span>Run Of Show</span>
          <TrademarkCircleOutlined className={styles.icon} />
        </div>
      </Col>
      <Col span={12} className={styles.rightSection}>
        <QuestionCircleOutlined className={styles.icon} />
        <Avatar src={'https://dummyimage.com/600x400/bf00bf/fff'} />
      </Col>
    </Row>
  );
};

export default Navbar;
