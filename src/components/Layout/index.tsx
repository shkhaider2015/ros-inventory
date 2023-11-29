"use client";
import React, { useState } from "react";
import {  Layout, theme } from "antd";
import RightSider from "../RightSider";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import TabNavigations from "../TabsNavigation";

const { Header, Content } = Layout;

const LayoutComp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [pageTitle, setPageTitle] = useState('Preview')

  return (
    <Layout className={`${styles.layoutContainer}`} >
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Layout className={styles.layoutMain}>
        <Layout className={styles.layoutLeftSection}>
          <div className={styles.pageTitle}>{pageTitle}</div>
          <TabNavigations setPageTitle={setPageTitle} />
          <Content
            style={{
              padding: 24,
              marginTop: 20,
              minHeight: '85%',
              border: '1px solid red',
            }}
          >
            {children}
          </Content>
        </Layout>
        <Layout className={styles.layoutRightSection}>
          <RightSider />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
