import React, { useEffect, useState, useRef } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import { Collapse } from "antd";
import logoKawaii from "../../assets/images/logo_kawaii.png";

import { ConsoleSqlOutlined,SearchOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";

const { Panel } = Collapse;
const cx = cn.bind(styles);

const Filter = ({ setTab, setIsGameTab, gameList, showCreateGameButton, setGameSelected, gameSelected }) => {
  const handleGameClick = (address, idx) => {
    console.log(address);
    setGameSelected(address);
  };
  const handleChange = (tabs) => {
    if(tabs.includes("3")){
      setTab(3);
    }
  }
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
          onChange={handleChange}
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
            <div className={cx("panel-content")}>
              {gameList?.map((gameName, idx) => (
                <div
                  className={gameName.gameAddress == gameSelected ? cx("name-selected") : cx("name")}
                  key={idx}
                  onClick={() => handleGameClick(gameName.gameAddress, idx)}
                >
                  <img src={logoKawaii} className={cx("name-avatar")} />
                  <span className={gameName.gameAddress == gameSelected ? cx("name-selected-text") : cx("name-text")}>
                    {gameName.gameName}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel header="Sell NFT" key="3" 
          className="site-collapse-custom-panel"
          >
            <div className={cx("panel-content")}  >
              <div className={cx("search-wrapper")}>
              <input type="text" className={cx("search-input")} placeholder="Search..."/>
              <SearchOutlined className={cx("search-icon")}/>
              </div>
            </div>
          </Panel>
          {showCreateGameButton && (
            <div onClick={() => setTab(2)}>
              <Button className={cx("button")}>Create Game</Button>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default Filter;
