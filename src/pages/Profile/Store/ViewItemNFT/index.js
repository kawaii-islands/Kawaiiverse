import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import KAWAII_STORE_ABI from "src/utils/abi/KawaiiverseStore.json";
import { BSC_CHAIN_ID } from "src/consts/blockchain";
import { KAWAIIVERSE_STORE_ADDRESS } from "src/consts/address";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router";
import { read } from "src/services/web3";
import ListNft from "src/components/ListNft/ListNft";
import { Row, Col } from "antd";
import axios from "axios";
import { Empty } from "antd";
import { URL } from "src/consts/constant";
import ListSkeleton from "../../../../components/ListSkeleton/ListSkeleton";
const cx = cn.bind(styles);

const ViewItemNFT = ({ gameSelected }) => {
	const { account } = useWeb3React();
	const [gameList, setGameList] = useState([]);
	const [gameItemList, setGameItemList] = useState([]);
	const [loadingListNFT, setLoadingListNFT] = useState(false);
	const [allItemFromGame, setAllItemFromGame] = useState([]);
	useEffect(() => {
		logGameList();
	}, [account]);

	useEffect(() => {
		getListNft();
	}, [gameSelected]);

	useEffect(() => {
		if (gameList.length > 0 && allItemFromGame.length > 0) {
			logItemList();
		} else {
			setGameItemList([]);
		}
	}, [gameList, allItemFromGame]);

	const getListNft = async () => {
		try {
			const res = await axios.get(`${URL}/v1/nft/${gameSelected}`);
			if (res.status === 200) {
				setAllItemFromGame(res.data.data);
			} else {
				toast.error("Cannot get list Nft");
			}
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	const logGameList = async () => {
		if (account) {
			try {
				const totalGame = await read(
					"lengthListNFT1155",
					BSC_CHAIN_ID,
					KAWAIIVERSE_STORE_ADDRESS,
					KAWAII_STORE_ABI,
					[],
				);
				// setGameList([]);
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
					});
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

	const logItemList = async () => {
		setLoadingListNFT(true);
		// setGameItemList([]);
		let list = [];
		const tmpGameArray = [...Array(gameSelected ? 1 : gameList.length).keys()];
		try {
			const gameListData = await Promise.all(
				tmpGameArray.map(async (nftId, idx) => {
					let gameItemLength = await read(
						"lengthSellNFT1155",
						BSC_CHAIN_ID,
						KAWAIIVERSE_STORE_ADDRESS,
						KAWAII_STORE_ABI,
						[gameSelected ? gameSelected : gameList[idx].gameAddress],
					);
					const tmpItemArray = Array.from({ length: gameItemLength }, (v, i) => i);
					const gameItemData = await Promise.all(
						tmpItemArray.map(async (nftId, index) => {
							let gameItem = await read("dataNFT1155s", BSC_CHAIN_ID, KAWAIIVERSE_STORE_ADDRESS, KAWAII_STORE_ABI, [
								gameSelected ? gameSelected : gameList[idx].gameAddress,
								index,
							]);

							let itemInfo = getItemInfo(gameItem.tokenId);
							list.push(Object.assign({}, gameItem, itemInfo[0]));
						}),
					).then(() => {
						setGameItemList(list);
					});
				}),
			);
		} catch (error) {
			console.log(error);
			toast.error(error.message || "An error occurred!");
		}

		setLoadingListNFT(false);
	};

	const getItemInfo = tokenId => {
		// allItemFromGame.filter(item => {
		//   console.log(item.tokenId, tokenId);
		// });
		return allItemFromGame.filter(item => item.tokenId == tokenId);
	};

	return (
		<div className={cx("right-main")}>
			<Row gutter={[20, 20]}>
				{/* <ListNft gameItemList={gameItemList} /> */}
				{loadingListNFT ? <ListSkeleton /> : <ListNft gameItemList={gameItemList} />}
			</Row>
		</div>
	);
};

export default ViewItemNFT;
