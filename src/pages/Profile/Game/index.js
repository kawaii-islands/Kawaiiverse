import React, { useEffect, useState } from "react";
import LoadingPage from "src/components/LoadingPage/LoadingPage";
import MainLayout from "src/components/MainLayout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Col, Row } from "antd";
import Filter from "src/components/Filter/Filter";
import { Button } from "@mui/material";
import ViewNFT from "./ViewNFT/ViewNFT";
import MintNFT from "./MintNFT/MintNFT";
import { read } from "src/services/web3";
import { BSC_CHAIN_ID } from "src/consts/blockchain";
import FACTORY_ABI from "src/utils/abi/factory.json";
import NFT1155_ABI from "src/utils/abi/KawaiiverseNFT1155.json";
import { useWeb3React } from "@web3-react/core";
import { FACTORY_ADDRESS } from "src/consts/address";

import FilterMobile from "src/components/FilterMobile/FilterMobile";

const cx = cn.bind(styles);

const KAWAII1155_ADDRESS = "0xD6eb653866F629e372151f6b5a12762D16E192f5";

const Game = () => {
	const { account } = useWeb3React();
	const [loading, setLoading] = useState(true);
	const [isMintNFT, setIsMintNFT] = useState(true);
	const [isGameTab, setIsGameTab] = useState(false);
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [gameList, setGameList] = useState([]);
	const [gameSelected, setGameSelected] = useState(KAWAII1155_ADDRESS);

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
			const totalGame = await read("nftOfUserLength", BSC_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account]);
			for (let index = 0; index < totalGame; index++) {
				let gameAddress = await read("nftOfUser", BSC_CHAIN_ID, FACTORY_ADDRESS, FACTORY_ABI, [account, index]);
				let gameName = await read("name", BSC_CHAIN_ID, gameAddress, NFT1155_ABI, []);
				setGameList(gameList => [...gameList, { gameAddress, gameName }]);
			}
			console.log(gameList);
		}
	};

	return (
		<div className={cx("profile")}>
			<div className={cx("right")}>
				<div className={cx("group-button")}>
					<Button className={cx("button", !isMintNFT ? "active" : "text")} onClick={() => setIsMintNFT(false)}>
						View NFT
					</Button>
					<Button className={cx("button", isMintNFT ? "active" : "text")} onClick={() => setIsMintNFT(true)}>
						Mint NFT
					</Button>
				</div>
				<div className={cx("content")}>
					{isMintNFT ? (
						<MintNFT setIsMintNFT={setIsMintNFT} gameSelected={gameSelected} />
					) : (
						<ViewNFT gameSelected={gameSelected} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Game;
