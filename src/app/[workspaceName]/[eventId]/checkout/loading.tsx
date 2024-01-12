"use client";
import Loader from "@/components/common/Loader";
import styles from './loading.module.css';

export default function Loading() {
  return (
    <main className={styles.container} >
      <Loader theme="PRIMARY" size="100px" />
    </main>
  );
}
