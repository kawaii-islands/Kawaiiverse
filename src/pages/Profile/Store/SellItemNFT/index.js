import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import { Col, Row } from "antd";

const cx = cn.bind(styles);

const SellItemNFT = () => {
  return (
    <div className={cx("table")}>
      <Row className={cx("table-header")}>
        <Col span={12} style={{ textAlign: "center" }}>
          NFT
        </Col>
        <Col span={4}>Price/NFT</Col>
        <Col span={7}>Quantity</Col>
        <Col span={1}>
          <input type="checkbox" />
        </Col>
      </Row>
      <div className={cx("table-body")}>
        <Row className={cx("table-body-header")}>
          <Col span={12} style={{ textAlign: "center" }}>
            <input type="search" placeholder="Seach name, ID" className={cx("search-input")}/>
          </Col>
          <Col span={4}>------</Col>
          <Col span={7}>
            <div className={cx("quantity")}>
              <div className={cx("quantity-btn", "quantity-minus")}>-</div>
              <input value={20} />
              <div className={cx("quantity-btn", "quantity-plus")}>+</div>
            </div>
          </Col>
          <Col span={1}>
            <input type="checkbox" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SellItemNFT;
