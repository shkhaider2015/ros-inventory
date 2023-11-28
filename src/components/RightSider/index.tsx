"use client";
import { Button, Col, Divider, Row } from "antd";
import React from "react";
import styles from "./RightSider.module.css";

const RightSider = () => {
  return (
    <Row className={styles.siderContainer}>
      <Row justify={"space-between"}>
        <Col span={12}>Subtotal</Col>
        <Col span={12}>$34.99</Col>
      </Row>
      <Divider />
      <Col span={12}>Shipping & taxes are calculated at checkout</Col>
      <Col span={12}>
        <Button type="primary">Proceed to Checkout</Button>{" "}
      </Col>
    </Row>
  );
};

const ItemComp = () => {
  return (
    <Row>
      <Col span={8}>image</Col>
      <Col span={16}>
        <Row>
          <Col span={24}>Head</Col>
          <Col span={24}>Desc</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RightSider;
