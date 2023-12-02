"use client"
import styles from "./styles.module.css";
import Image from "next/image";

const Button: React.FC<IButton> = (props) => {
  const {
    icon,
    className,
    label,
    type = "Primary",
    onClick = () => {},
  } = props;
  return (
    <div
      className={`${styles.container} ${styles[type]} ${className} `}
      onClick={onClick}
    >
      {icon && <Image src={icon} alt="btn-icon" width={18} height={18} />}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

interface IButton {
  label?: string | undefined;
  icon?: string | undefined;
  type?: "Primary" | "Secondary";
  onClick?: () => void;
  className?: string | undefined;
}

export default Button;
