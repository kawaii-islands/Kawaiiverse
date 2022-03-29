import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import KAWAII_STORE_ABI from "src/utils/abi/KawaiiverseStore.json";
import { BSC_CHAIN_ID } from "src/consts/blockchain";
import { KAWAIIVERSE_STORE_ADDRESS } from "src/consts/address";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { read } from "src/services/web3";
import ListNft from "src/components/ListNft/ListNft";
import { Row, Col } from "antd";
const cx = cn.bind(styles);

const ViewItemNFT = () => {
  const { account } = useWeb3React();
  const [gameList, setGameList] = useState([]);
  const [gameItemList, setGameItemList] = useState([]);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingListNFT, setLoadingListNFT] = useState(true);
  const [totalGameAmount, setTotalGameAmount] = useState(0);
  const [gameSelected, setGameSelected] = useState([]);
  useEffect(() => {
    logInfo();
  }, [totalGameAmount, account]);

  useEffect(() => {
    logGameData();
  }, [gameSelected, gameList]);
  const navigate = useNavigate();
  const logInfo = async () => {
    if (account) {
      try {
        const totalGame = await read(
          "lengthListNFT1155",
          BSC_CHAIN_ID,
          KAWAIIVERSE_STORE_ADDRESS,
          KAWAII_STORE_ABI,
          [],
        );
        setGameList([]);
        // const tmpArray = [...Array(totalGame.length).keys()];
        const tmpArray = Array.from({ length: totalGame }, (v, i) => i);

        try {
          let lists = [];
          const gameListData = Promise.all(
            tmpArray.map(async (nftId, index) => {
              let gameAddress = await read("listNFT1155", BSC_CHAIN_ID, KAWAIIVERSE_STORE_ADDRESS, KAWAII_STORE_ABI, [
                index,
              ]);
              let gameName = await read("name", BSC_CHAIN_ID, gameAddress, NFT1155_ABI, []);
              lists.push({ gameAddress, gameName });
            }),
          ).then(() => {
            setGameList(lists);
            setTotalGameAmount(gameList.length);
          });
          // console.log(lists)
        } catch (error) {
          console.log(error);
          toast.error(error.message || "An error occurred!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "An error occurred!");
      }
    }
  };

  const logGameData = async () => {
    setLoadingListNFT(true);
    setGameItemList([]);
    let list = [];
    const tmpGameArray = [...Array(gameSelected.length ? gameSelected.length : gameList.length).keys()];
    try {

      const gameListData = await Promise.all(
        tmpGameArray.map(async (nftId, idx) => {
          let gameItemLength = await read(
            "lengthSellNFT1155",
            BSC_CHAIN_ID,
            KAWAIIVERSE_STORE_ADDRESS,
            KAWAII_STORE_ABI,
            [gameSelected.length ? gameSelected[idx].gameAddress : gameList[idx].gameAddress],
          );
          const tmpItemArray = Array.from({ length: gameItemLength }, (v, i) => i);
         
            
            const gameItemData = await Promise.all(
              tmpItemArray.map(async (nftId, index) => {
                let gameItem = await read("dataNFT1155s", BSC_CHAIN_ID, KAWAIIVERSE_STORE_ADDRESS, KAWAII_STORE_ABI, [
                  gameSelected.length ? gameSelected[idx].gameAddress : gameList[idx].gameAddress,
                  index,
                ]);
                list.push(gameItem);
              }),
            ).then(() => {
              console.log(list.length)
              setGameItemList(list)
            });
         
        }),
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred!");
    }

    setLoadingListNFT(false);
  };
  let gameItemOwner = gameItemList.filter(item => item.owner === account);
  return(<div className={cx("right-main")}>
  <Row gutter={[20, 20]}>
    <ListNft gameItemList={gameItemOwner} />
  </Row>
</div>)
  
};

export default ViewItemNFT;
