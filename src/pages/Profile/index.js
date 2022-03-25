import React, { useEffect, useState } from "react";
import LoadingPage from "src/components/LoadingPage/LoadingPage";
import MainLayout from "src/components/MainLayout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Col, Row } from "antd";
import Filter from "src/components/Filter/Filter";
import { Button } from "@mui/material";
import { read } from "src/services/web3";
import { BSC_CHAIN_ID } from "src/consts/blockchain";
import FACTORY_ABI from "src/utils/abi/factory.json";
import NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import { useWeb3React } from "@web3-react/core";
import { FACTORY_ADDRESS } from "src/consts/address";
import CreateGame from "./CreateGame/CreateGame";
import Game from "./Game/index";
import StoreProfile from "./Store/index";
import Marketplace from "./Marketplace/index";

import FilterMobile from "src/components/FilterMobile/FilterMobile";
import { Outlet } from "react-router-dom";
const cx = cn.bind(styles);

const KAWAII1155_ADDRESS = "0xD6eb653866F629e372151f6b5a12762D16E192f5";

const Profile = () => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [isMintNFT, setIsMintNFT] = useState(true);
  const [isGameTab, setIsGameTab] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [gameSelected, setGameSelected] = useState(KAWAII1155_ADDRESS);
  const [activeTab, setActiveTab] = useState(2);

  const getActiveTab = tab => {
    switch (tab) {
      case 0:
        return (
          <CreateGame
            gameList={gameList}
            setGameSelected={setGameSelected}
            gameSelected={gameSelected}
            logInfo={logInfo}
          />
        );
      case 1:
        return <Game />;
      case 2:
        return <StoreProfile />;
      case 3:
        return <Marketplace />;
      default:
        return (
          <CreateGame
            gameList={gameList}
            setGameSelected={setGameSelected}
            gameSelected={gameSelected}
            logInfo={logInfo}
          />
        );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    logInfo();
  }, [account]);

  const logInfo = async () => {
    if (account) {
      setGameList([]);
      try {
        const totalGame = await read("nftOfUserLength", BSC_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account]);
        for (let index = 0; index < totalGame; index++) {
          let gameAddress = await read("nftOfUser", BSC_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account, index]);
          let gameName = await read("name", BSC_CHAIN_ID, gameAddress, NFT1155_ABI, []);
          setGameList(gameList => [...gameList, { gameAddress, gameName }]);
        }
        console.log(gameList);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <MainLayout>
      <div className={cx("profile")}>
        {openFilterModal && (
          <FilterMobile
            setOpenFilterModal={setOpenFilterModal}
            showCreateGameButton={true}
            setIsGameTab={setIsGameTab}
            gameList={gameList}
            setGameSelected={setGameSelected}
            gameSelected={gameSelected}
          />
        )}
        <Row>
          <Col md={6} className={cx("left")}>
            <Filter
              setIsGameTab={setIsGameTab}
              showCreateGameButton={true}
              gameList={gameList}
              setGameSelected={setGameSelected}
              gameSelected={gameSelected}
              setActiveTab={setActiveTab}
            />
          </Col>

          <Col offset={1} md={17} className={cx("right-wrapper")}>
            {getActiveTab(activeTab)}
          </Col>
        </Row>
      </div>
      <Outlet />
    </MainLayout>
  );
};

export default Profile;
