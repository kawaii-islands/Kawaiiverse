import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import { DownOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, tableBodyClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cx = cn.bind(styles);

const tab = [
	{
		key: 1,
		path: 'game',
		name: 'Game',
	},
	{
		key: 2,
		path: 'store',
		name: 'Store',
	},
]

const Filter = ({ gameList, setGameSelected, gameSelected, activeTab, setActiveTab }) => {
	const navigate = useNavigate();

	const handleGameClick = (address, idx) => {
		console.log(address);
		setGameSelected(address);
	};

	const handleNavigateProfile = (key) => {
		let tab = key.slice(-1);
		setActiveTab(parseInt(tab));

	}

	return (
		<div className={cx("filter")}>
			<div className={cx("create-game")} onClick={() => {
				setActiveTab(0);
				navigate('/profile/create-game')
			}}>
				<span>Create game</span>
				<PlusOutlined />
			</div>

			{tab.map((tab, id) => (
				<div
					className={cx("collapse")}
					key={id}
					onClick={() => {
						setActiveTab(tab.key);
						navigate(`/profile/${tab.path}`);
					}}
				>
					<div className={cx("collapse-title")}>
						<span>{tab.name}</span>
						{activeTab === tab.key ? <DownOutlined /> : <RightOutlined />}
					</div>

					{activeTab === tab.key && (
						<div className={cx("panel")}>
							{gameList?.map((gameName, idx) => (
								<div
									className={cx(
										"panel-item",
										gameName.gameAddress === gameSelected && "active"
									)}
									key={idx}
									onClick={() => handleGameClick(gameName.gameAddress, idx)}
								>
									<img src={logoKawaii} alt="logo" className={cx("game-logo")} />
									<span>
										{gameName.gameName}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			))}

		</div>
	);
};

export default Filter;
