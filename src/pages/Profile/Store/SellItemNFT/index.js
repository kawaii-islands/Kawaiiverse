import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import { Col, Row, Spin } from "antd";
import { toast } from "react-toastify";
import Item from "./Item";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { read, sign, write } from "src/services/web3";
import { KAWAIIVERSE_STORE_ADDRESS, RELAY_ADDRESS } from "src/consts/address";
import KAWAIIVERSE_NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import KAWAII_STORE_ABI from "src/utils/abi/KawaiiverseStore.json";
import RELAY_ABI from "src/utils/abi/relay.json";
import { BSC_CHAIN_ID, BSC_rpcUrls } from "src/consts/blockchain";
const cx = cn.bind(styles);
const web3 = new Web3(BSC_rpcUrls);

const SellItemNFT = ({ gameSelected }) => {
  const [list, setList] = useState([]);
  const [rowItem, setRowItem] = useState(1);
  const [canAdd, setCanAdd] = useState(false);
  const [listSell, setListSell] = useState([]);
  const { account, library } = useWeb3React();
  const [isApprovedForAll, setIsApprovedForAll] = useState(false);
  const [loadingSellNft, setLoadingSellNft] = useState(false);

  useEffect(() => {
    getListNft();
    getAllowance();
  }, [gameSelected]);

  const getListNft = async () => {
    try {
      const res = await axios.get(`http://159.223.81.170:3000/v1/nft/${gameSelected}`);
      if (res.status === 200) {
        console.log(res.data.data);
        setList(res.data.data);
      } else {
        toast.error("Cannot get list Nft");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getAllowance = async () => {
    const isApprovedForAll = await read("isApprovedForAll", BSC_CHAIN_ID, gameSelected, KAWAIIVERSE_NFT1155_ABI, [
      account,
      KAWAIIVERSE_STORE_ADDRESS,
    ]);
    setIsApprovedForAll(isApprovedForAll);
  };

  const addItem = () => {
    if (!canAdd) return;
    setRowItem(rowItem + 1);
    setCanAdd(false);
  };

  const sellNft = async () => {
    setLoadingSellNft(true);
    try {
      if (!isApprovedForAll) {
        await write(
          "setApprovalForAll",
          library.provider,
          gameSelected,
          KAWAIIVERSE_NFT1155_ABI,
          [KAWAIIVERSE_STORE_ADDRESS, true],
          {
            from: account,
          },
        );
      }
      const { r, s, v } = await getSignature();
      console.log(r, s, v);
      if (listSell.length == 1) {
        const _data = web3.eth.abi.encodeFunctionCall(
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "address",
                name: "_nftAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_price",
                type: "uint256",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
            ],
            name: "saleNFT1155",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          [
            account,
            gameSelected,
            listSell[0].tokenId,
            listSell[0].quantity,
            web3.utils.toWei(listSell[0].price),
            v,
            r,
            s,
          ],
        );
        await write(
          "execute",
          library.provider,
          RELAY_ADDRESS,
          RELAY_ABI,
          [KAWAIIVERSE_STORE_ADDRESS, _data],
          { from: account },
          hash => {
            console.log(hash);
          },
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSellNft(false);
    }
  };
  const getSignature = async () => {
    const nonce = await read("nonces", BSC_CHAIN_ID, KAWAIIVERSE_STORE_ADDRESS, KAWAII_STORE_ABI, [account]);
    const name = await read("NAME", BSC_CHAIN_ID, KAWAIIVERSE_STORE_ADDRESS, KAWAII_STORE_ABI, []);
    const EIP712Domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ];

    const domain = {
      name,
      version: "1",
      chainId: BSC_CHAIN_ID,
      verifyingContract: KAWAIIVERSE_STORE_ADDRESS,
    };

    const Data = [
      { name: "sender", type: "address" },
      { name: "_nftAddress", type: "address" },
      { name: "nonce", type: "uint256" },
    ];

    const message = {
      sender: account,
      _nftAddress: gameSelected,
      nonce,
    };

    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Data,
      },
      domain,
      primaryType: "Data",
      message,
    });
    const signature = await sign(account, data, library.provider);
    return signature;
  };

  return (
    <div className={cx("table")}>
      <Row className={cx("table-header")}>
        <Col span={12} style={{ textAlign: "center" }}>
          NFT
        </Col>
        <Col span={4}>Price/NFT</Col>
        <Col span={7}>Quantity</Col>
        <Col span={1}>{/* <input type="checkbox" /> */}</Col>
      </Row>
      <div className={cx("table-body")}>
        {new Array(rowItem).fill().map((i, idx) => (
          <Item
            setCanAdd={setCanAdd}
            list={list}
            listSell={listSell}
            setListSell={setListSell}
            key={`row-item-${idx}`}
          />
        ))}
      </div>
      <div className={cx("wrapper-btn")}>
        <Button className={cx("wrapper-btn--sell")} onClick={sellNft}>
          {loadingSellNft ? <Spin /> : "SELL NFT"}
        </Button>
        <Button className={cx("wrapper-btn--add")} onClick={addItem}>
          ADD NFT
        </Button>
      </div>
    </div>
  );
};

export default SellItemNFT;
