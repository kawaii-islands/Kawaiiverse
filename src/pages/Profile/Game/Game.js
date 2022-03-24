import React, { useEffect, useState } from "react";
import styles from "./Game.module.scss";
import cn from "classnames/bind";
import { read, createNetworkOrSwitch, write } from "src/services/web3";
import { BSC_CHAIN_ID, BSC_rpcUrls } from "src/consts/blockchain";
import { toast } from "react-toastify";
import { Col, Row, Spin } from "antd";
import Web3 from "web3";
import plusIcon from "src/assets/icons/plus.svg";
import { useWeb3React } from "@web3-react/core";
import trashIcon from "src/assets/icons/coolicon.svg";
import { Button } from "@mui/material";
import RELAY_ABI from "src/utils/abi/relay.json";
import { RELAY_ADDRESS, KAWAIIVERSE_NFT1155_ADDRESS, FACTORY_ADDRESS } from "src/consts/address";
import { Close } from "@mui/icons-material";
import logoKawaii from "src/assets/images/logo_kawaii.png";

const cx = cn.bind(styles);
const web3 = new Web3(BSC_rpcUrls);

const Game = ({ gameList, setGameSelected, gameSelected, logInfo }) => {
  const { account, chainId, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  let gameNft = {
    name: "String...",
    symbol: "String...",
  };

  const [gameInfo, setgameInfo] = useState("");
  const inputChangeHandler = (key, value) => {
    setgameInfo({ ...gameInfo, [key]: value });
  };
  const handleGameClick = (address, idx) => {
    console.log(address);
    setGameSelected(address);
  };
  const createGame = async () => {
    if (!gameInfo?.name || !gameInfo?.symbol) return;
    setLoading(true);
    const _data = web3.eth.abi.encodeFunctionCall(
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_imp",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_symbol",
            type: "string",
          },
        ],
        name: "createNFT1155",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      [account, KAWAIIVERSE_NFT1155_ADDRESS, gameInfo.name, gameInfo.symbol],
    );
      console.log(_data);
    try {
      if (chainId !== BSC_CHAIN_ID) {
        console.log("BSC_CHAIN_ID :>> ", BSC_CHAIN_ID);
        console.log("chainId :>> ", chainId);
        const error = await createNetworkOrSwitch(library.provider);
        if (error) {
          throw new Error("Please change network to Testnet Binance smart chain.");
        }
      }
      await write(
        "execute",
        library.provider,
        RELAY_ADDRESS,
        RELAY_ABI,
        [FACTORY_ADDRESS, _data],
        { from: account },
        hash => {
          console.log(hash);
        },
      );
      setLoading(false);
      logInfo();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "An error occurred!");
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("form")}>
        <div className={cx("form-input")}>
          <div className={cx("form-item")}>
            <div className={cx("label")}>Name</div>
            <input
              placeholder="String..."
              value={gameInfo.name}
              className={cx("input")}
              required
              onChange={e => inputChangeHandler("name", e.target.value)}
            />
          </div>
          <div className={cx("form-item")}>
            <div className={cx("label")}>Symbol</div>
            <input
              placeholder="String..."
              value={gameInfo.symbol}
              className={cx("input")}
              required
              onChange={e => inputChangeHandler("symbol", e.target.value)}
            />
          </div>
        </div>
        <div className={cx("btn-wrapper")}>
          <Button className={cx("confirm-btn")} onClick={createGame}>
            {loading ? <Spin style={{ color: "white" }} /> : "CONFIRM"}
          </Button>
        </div>
      </div>
      <div className={cx("divider")}></div>
      <div className={cx("name-title")}>My game</div>
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
  );
};

export default Game;
