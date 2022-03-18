import React, { useEffect, useState } from "react";
import styles from "./Game.module.scss";
import cn from "classnames/bind";
import { read, sign, createNetworkOrSwitch, write } from "src/services/web3";
import { BSC_CHAIN_ID, BSC_rpcUrls, BSC_TESTNET_CHAIN_ID } from "src/consts/blockchain";
import { toast } from "react-toastify";
import { Col, Row, Spin } from "antd";
import Web3 from "web3";
import plusIcon from "src/assets/icons/plus.svg";
import { useWeb3React } from "@web3-react/core";
import trashIcon from "src/assets/icons/coolicon.svg";
import { Button } from "@mui/material";
import RELAY_ABI from "src/utils/abi/relay.json";
import FACTORY_ABI from "src/utils/abi/factory.json";
import NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import { RELAY_ADDRESS, KAWAIIVERSE_NFT1155_ADDRESS, FACTORY_ADDRESS } from "src/consts/address";

const cx = cn.bind(styles);
const web3 = new Web3(BSC_rpcUrls);

const Game = () => {
  const { account, chainId, library } = useWeb3React();

  const logInfo = async () => {
    const totalGame = await read("nftOfUserLength", BSC_TESTNET_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account]);
    for (let index = 0; index < totalGame; index++) {
      let gameAddress = await read("nftOfUser", BSC_TESTNET_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account, index]);

      console.log(gameAddress);
      let gameName = await read("name", BSC_TESTNET_CHAIN_ID, gameAddress, NFT1155_ABI, []);
      console.log(gameName);
    }
    console.log(totalGame);
  };

  let gameNft = {
    name: "AN BINH CHI",
    symbol: "ABC",
  };

  const [gameInfo, setgameInfo] = useState(gameNft);
  const inputChangeHandler = (key, value) => {
    setgameInfo({ ...gameInfo, [key]: value });
    console.log("listNft :>> ", gameInfo);
  };

  const createGame = async () => {
    console.log(KAWAIIVERSE_NFT1155_ADDRESS);

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

    try {
      if (chainId !== BSC_TESTNET_CHAIN_ID) {
        const error = await createNetworkOrSwitch(library.provider);
        if (error) {
          throw new Error("Please change network to Testnet Binance smart chain.");
        }
      }
      await write("execute", library.provider, RELAY_ADDRESS, RELAY_ABI, [FACTORY_ADDRESS, _data], { from: account });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred!");
    }
  };

  return (
    <div className={cx("table")}>
      <Row className={cx("table-header")}>
        <Col span={4} style={{ textAlign: "center" }}>
          No.
        </Col>
        <Col span={8}>Name</Col>
        <Col span={8}>Symbol</Col>
        <Col span={4}></Col>
      </Row>
      <div className={cx("mintNFT-box")}>
        <Row className={cx("first-row")}>
          <Col span={4} style={{ textAlign: "center" }}>
            1
          </Col>
          <Col span={8}>
            <input
              placeholder="Name"
              value={gameInfo.name}
              className={cx("input")}
              onChange={e => inputChangeHandler("name", e.target.value)}
            />
          </Col>
          <Col span={8}>
            <input
              placeholder="Name"
              value={gameInfo.symbol}
              className={cx("input")}
              onChange={e => inputChangeHandler("symbol", e.target.value)}
            />
          </Col>
          <Col span={4} style={{ textAlign: "center" }}>
            <img src={trashIcon} alt="plus-icon" />
          </Col>
        </Row>

        <div className={cx("box-bottom")}>
          <div className={cx("left")}></div>
          <div className={cx("right")}>
            <Button className={cx("confirm")} onClick={() => logInfo()}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("group-button")}>
        <Button className={cx("create-nft")} onClick={createGame}>
          <img src={plusIcon} alt="plus-icon" /> &nbsp; Create Game
        </Button>
      </div>
    </div>
  );
};

export default Game;
