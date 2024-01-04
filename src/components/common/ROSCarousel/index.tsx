"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import Image from "next/image";

const ROSCarousel: React.FC<IROSCarousel> = (props) => {
  const { onClose, open, images } = props;
  const [element, setElement] = useState<Element | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // console.log("Images : ", images);
  

  useEffect(() => {
    if (typeof window !== "undefined")
      setElement(document.getElementById("carousel-root"));
  }, []);

  function _handleClose() {
    onClose();
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const content = (
    <div
      className={`${styles.ROSCarouselContainer} ${
        open ? styles.visible : styles.hidden
      } `}
    >
      <div className={styles.header}>
        <div />
        <div className={styles.itemCoun} >{`${currentIndex+1}/${ images ? images.length : 0}`}</div>
        <div className={styles.closeIcon} onClick={_handleClose}>
          <Image
            src={"/images/icons/Close_round.svg"}
            alt="close-icon"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className={styles.carouselContentContainer}>
      <div className={styles.CMContainer}>
          <div className={styles.CMleft}>
            <div
              className={styles.arrowContainer}
              onClick={() => setCurrentIndex((pS) => {
                if(pS <= 0) return images.length - 1;
                return pS - 1;
              })}
            >
              <Image
                src={"/images/icons/Expand_left.svg"}
                alt="expand"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className={styles.CMimageSection}>
            {/* {
              images && images.length > 0 && <Image
              className={`${styles.image} ${isImageLoaded ? styles.visible : styles.hidden}`}
              src={images[currentIndex] || ""}
              alt=""
              width={800}
              height={600}
              layout="responsive"
              onLoad={handleImageLoad}
            />
            } */}
             {
              images && images.length > 0 && <Image
              className={`${styles.image} ${isImageLoaded ? styles.visible : styles.hidden}`}
              src={images[currentIndex] || ""}
              alt=""
              width={800}
              height={600}
              layout="responsive"
              onLoad={handleImageLoad}
            />
            }
            
          </div>
          <div className={styles.CMright}>
            <div
              className={styles.arrowContainer}
              onClick={() => setCurrentIndex((pS) => {
                if(pS >= images.length-1) return 0;
                return pS + 1
              })}
            >
              <Image
                src={"/images/icons/Expand_right.svg"}
                alt="expand"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return element ? ReactDOM.createPortal(content, element) : <></>;
};

interface IROSCarousel {
  onClose: () => void;
  open: boolean;
  images: string[]
}

export default ROSCarousel;
