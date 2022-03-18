import React, { useEffect, useState, useRef } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import { Collapse } from "antd";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const cx = cn.bind(styles);

const Filter = ({ setIsGameTab }) => {
  return (
    <div className={cx("filter")}>
      <div className={cx("card-header")}>
        <img src={filter} alt="filter" />
        <span className={cx("title")}>Filter</span>
      </div>
      <div className={cx("collapse")}>
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
          className="site-collapse-custom-collapse"
          // onChange={() => console.log("Hello")}
        >
          <Panel header="Store" key="1" className="site-collapse-custom-panel">
            <div className={cx("panel-content")}>
              <div className={cx("name")}>
                <img src={logoKawaii} className={cx("name-avatar")} />
                <span className={cx("name-text")}>Kawaii island</span>
              </div>
              <div className={cx("name")}>
                <img src={logoKawaii} className={cx("name-avatar")} />
                <span className={cx("name-text")}>Kawaii island</span>
              </div>
            </div>
          </Panel>
          <Panel header="Game" key="2" className="site-collapse-custom-panel">
            {/* <div className={cx("panel-content")}>{"text"}</div> */}
          </Panel>

          <div className="site-collapse-custom-panel" onClick={() => setIsGameTab(true)}>
            Game
          </div>

          <Panel header="Amount" key="3" className="site-collapse-custom-panel">
            <div className={cx("panel-content")}>{"text"}</div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Filter;
