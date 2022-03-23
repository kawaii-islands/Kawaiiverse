import React, { useEffect } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import { Collapse } from "antd";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import { Button } from "@mui/material";

const { Panel } = Collapse;
const cx = cn.bind(styles);

const Filter = ({ setIsGameTab, gameList, showCreateGameButton, setGameSelected, gameSelected }) => {
  const handleGameClick = (address, idx) => {
    console.log(address);
    setGameSelected(address);
  };

  useEffect(() => {
    console.log(gameList);
  });

  return (
    <div className={cx("filter")}>
      <div className={cx("card-header")}>
        <img src={filter} alt="filter" />
        <span className={cx("title")}>Filter</span>
      </div>
      <div className={cx("collapse")}>
        <Collapse
          defaultActiveKey={["1", "2"]}
          expandIconPosition="right"
          bordered={false}
          className="site-collapse-custom-collapse"
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

          {showCreateGameButton && (
            <div onClick={() => setIsGameTab(true)}>
              <Button className={cx("button")}>Create Game</Button>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default Filter;
