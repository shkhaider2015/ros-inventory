"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { startProgress } from "@/store/features/ProgressLoader";

const Header = () => {
  const cartItems = useSelector((state: any) => state.cart);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();


  const _gotoCheckout = () => {
    let splitData = pathName.split("/");
    if (
      !splitData.includes("checkout") ||
      splitData[splitData.length - 1].toLowerCase() !== "checkout"
    ) {
      dispatch(startProgress())
      router.push(pathName + "/checkout");
    }
  };

  const _gotoHome = () => {
    
    if (pathName.includes("checkout")) {
      let splitData = pathName.split("/");
      splitData.pop()
      router.push(splitData.join("/"));
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.logoContainer} onClick={_gotoHome}>
          <Image
            src={"/images/new_logo.svg"}
            alt="logo"
            width={40}
            height={40}
          />
          <span>Run Of Show</span>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div
          className={`${styles.cartContainer} ${
            pathName.includes("checkout") ? styles.colorContainer : ""
          } `}
          onClick={_gotoCheckout}
        >
          {cartItems?.length > 0 && (
            <div className={styles.itemsCount}>{cartItems?.length}</div>
          )}

          <Image
            src={
              pathName.includes("checkout")
                ? "/images/icons/bag-2-light.svg"
                : "/images/icons/bag-2.svg"
            }
            alt="basket"
            width={25}
            height={25}
          />
        </div>
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
