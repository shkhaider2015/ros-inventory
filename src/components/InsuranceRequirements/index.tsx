import Image from "next/image";
import styles from "./styles.module.css";

const InsuranceRequirements = () => {
  const data: IDocItem[] = [
    {
      title: "Document name will come here.pdf",
      desc: "Uploaded: Nov 01, 2023   11:00PM GST",
    },
    {
      title: "Document name will come here.pdf",
      desc: "Uploaded: Nov 02, 2023   10:00PM GST",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.iconContainer}>
          <Image
            src={"/images/icons/HandHeart.svg"}
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div>
          <div className={styles.title}>Insurance Requirements</div>
          <div className={styles.desc}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some...
          </div>
        </div>
      </div>
      <div className={styles.hrLine} />
      <div className={styles.docsContainer}>
        <div className={styles.docsTitle}>2 DOCUMENTS UPLOADED</div>
        {data.map((item, index) => (
          <DocItem {...item} key={item.title + index} />
        ))}
      </div>
    </div>
  );
};

const DocItem: React.FC<IDocItem> = ({ title, desc }) => {
  return (
    <div className={styles.docContainer}>
      <div className={styles.leftCol}>
        <div className={styles.docIconContainer}>
          <Image
            src={"/images/icons/FileText.svg"}
            alt=""
            width={20}
            height={20}
          />
        </div>

        <div className={styles.textCon}>
          <div className={styles.docTitle}>{title}</div>
          <div className={styles.decDesc}>{desc}</div>
        </div>
      </div>
      <div className={styles.rightCol}>
        <div className={styles.docIconContainer}>
          <Image
            src={"/images/icons/Import.svg"}
            alt="import"
            width={22}
            height={22}
          />
        </div>
      </div>
    </div>
  );
};

interface IDocItem {
  title: string;
  desc: string;
}

export default InsuranceRequirements;
