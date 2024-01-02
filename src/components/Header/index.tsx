// "use client";
import Image from "next/image";
import styles from "./styles.module.css";

const Header = () => {
  // const cartItems = useSelector((state: any) => state.cart);

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
          {/* <TrademarkCircleOutlined className={styles.icon} /> */}
        </div>
      </div>

      <div className={styles.rightContainer}>
        {/* <div className={styles.cartContainer}>
          {cartItems?.length > 0 && (
            <div className={styles.itemsCount}>{cartItems?.length}</div>
          )}

          <Image
            src={"/images/icons/Basket.svg"}
            alt="basket"
            width={22}
            height={22}
          />
        </div> */}
        {/* <div className={styles.iconCon}>
          <Image
            src={"/images/icons/questionMark.svg"}
            alt="question"
            width={22}
            height={22}
          />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
