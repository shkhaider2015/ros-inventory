"use client"
import React from "react";
import styles from "./styles.module.css";
import { Button, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

const HomeScreen = () => {
  return (
    <ConfigProvider theme={theme}>
      <div className={styles.container}>
        <h1>Home Screen</h1>
        <Button type="primary">Primary Button</Button>
      </div>
    </ConfigProvider>
  );
};

export default HomeScreen;
