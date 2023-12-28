"use client";
import Image from "next/image";
import styles from "./styles.module.css";

const SocialMediaIcon: React.FC<{ items: IScoialMedia[] }> = ({ items }) => {
    const _OpenURL = (url:string) => {
      let URL = url.toLowerCase();
      if(!URL.includes('www')) URL = 'www.' + URL
      if(!URL.includes("://")) URL = 'https://' + URL
        window.open(URL, "_blank")
    }

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Image
          className={styles.socialMediaImage}
          key={item.id}
          src={item.icon}
          alt={item.platform_name}
          width={30}
          height={30}
          onClick={() => _OpenURL(item.url)}
        />
      ))}
    </div>
  );
};

export interface IScoialMedia {
  id: string;
  platform_name: string;
  url: string;
  icon: string
}

export default SocialMediaIcon;