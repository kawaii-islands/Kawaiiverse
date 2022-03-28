import React, { useEffect, useState, useRef } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import { Collapse } from "antd";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import { ConsoleSqlOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const cx = cn.bind(styles);

const tab = [
	{
		key: 0,
		path: '',
	},
	{
		key: 1,
		path: 'game',
	},
	{
		key: 2,
		path: 'store',
	},
	{
		key: 3,
		path: 'marketplace',
	}
]

const Filter = ({ gameList, setGameSelected, gameSelected, setActiveTab }) => {
	const navigate = useNavigate();

	const handleGameClick = (address, idx) => {
		console.log(address);
		setGameSelected(address);
	};

	const handleNavigateProfile = (key) => {
		let tab = key.slice(-1);
		setActiveTab(parseInt(tab));
		// console.log('key :>> ', tab[key].path);
		// navigate(`/profile/${tab[key].path}`);
	}

	return (
		<div className={cx("filter")}>
			<div className={cx("create-game")} onClick={() => setActiveTab(0)}>
				<span>Create game</span>
				<PlusOutlined />
			</div>

			<div className={cx("collapse")}>
				<Collapse
					defaultActiveKey={["1"]}
					expandIconPosition="right"
					bordered={false}
					className="site-collapse-custom-collapse"
					onChange={(key) => handleNavigateProfile(key)}
				>
					<Panel
						header="Game"
						key="1"
						className="site-collapse-custom-panel"
						onClick={() => navigate("/profile")}
					>
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

					<Panel
						header="Store"
						key="2"
						className="site-collapse-custom-panel"
					>
					</Panel>

				</Collapse>
			</div>
		</div>
	);
};

export default Filter;
