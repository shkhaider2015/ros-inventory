import Image from "next/image";
import styles from "./styles.module.css";
import {
  QuestionCircleOutlined,
  TrademarkCircleOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.logoContainer}>
          <Image
            src={"/images/new_logo.svg"}
            alt="logo"
            width={40}
            height={40}
          />
          <span>Run Of Show</span>
          <TrademarkCircleOutlined className={styles.icon} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.cartContainer} >
          <Image src={'/images/icons/Basket.svg'} alt="basket" width={22} height={22} />
        </div>
        <div className={styles.iconCon}>
          <QuestionCircleOutlined className={styles.icon} />
        </div>
      </div>
    </header>
  );
};

export default Header;
