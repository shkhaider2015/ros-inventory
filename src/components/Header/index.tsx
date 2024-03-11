"use client";
import Image from "next/image";
import styles from "./styles.module.css";
// import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Button from "../common/Button";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "@/hooks/useSnackbar";
import ROSSnackbar from "../common/ROSSnackbar";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";

// const eventId = "a7219297-bee3-4099-98d3-935689927d7f";

const Header = () => {
  // const cartItems = useSelector((state: any) => state.cart);
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  const { isActive, type, message, openSnackBar } = useSnackbar();

  const _gotoCheckout = () => {
    let splitData = pathName.split("/");
    if (
      !splitData.includes("checkout") ||
      splitData[splitData.length - 1].toLowerCase() !== "checkout"
    ) {
      router.push(pathName + "/checkout");
    }
  };

  const _gotoHome = () => {
    if (pathName.includes("checkout")) {
      let splitData = pathName.split("/");
      splitData.pop();
      router.push(splitData.join("/"));
    }
  };

  const _dlownloadPdf = async () => {
    try {
      let URL = "https://inventory.runofshowapp.com/api/pdf";
      // // let URL2 = "http://localhost:4042/api/pdf";
      // let Prod = "https://inventory.runofshowapp.com/api/pdf";
      // let URL = "/api/pdf";
      let event_id = pathName.split("/")?.[2];
      setLoading(true);
      const response = await axios.post(
        URL,
        { event_id: event_id },
        { responseType: "blob" }
      );

      console.log(response);
      const contentType = response.headers["content-type"];
      if (
        contentType &&
        contentType.toLowerCase().includes("application/pdf")
      ) {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "inventory-file.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileURL);
        // openSnackBar("File downloaded successfully", "success");
      } else {
        console.log("Messagfe : ", response.data);

        // openSnackBar("Download file error", "danger");
      }
    } catch (error) {
      console.log("Error : ", error);

      // openSnackBar("Download file error", "danger" );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.logoContainer} onClick={_gotoHome}>
          <Image
            src={"/images/new_logo.svg"}
            alt="logo"
            width={50}
            height={50}
          />
          <span>Run Of Show</span>
        </div>
      </div>

      <div className={styles.rightContainer}>
        {/* <div
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
        </div> */}
        <div className={styles.pdfBtnContainer}>
          <div className={styles.iconBtnContainer} onClick={_dlownloadPdf}>
            {
              loading ? <LoadingOutlined spin /> : <DownloadOutlined className={styles.iconBtn} />
            }
            
          </div>

          <Button
            className={styles.pdfBtn}
            type="Primary"
            label="Download PDF"
            onClick={_dlownloadPdf}
            loading={loading}
          />
        </div>
        <div className={`${styles.cartTextBtn}`} onClick={_gotoCheckout}>
          View & Save Cart
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
