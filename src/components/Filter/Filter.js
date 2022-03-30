import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./Filter.module.scss";
import filter from "../../assets/icons/filter.svg";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import { DownOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, tableBodyClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

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

			<div className={cx("game-group")}>
				<Row>
					<Col
						span={12}
						onClick={() => {
							setActiveTab(1);
							navigate('/profile/game');
						}}
					>
						<span className={cx("title", activeTab === 1 && "active")}>Game</span>
					</Col>
					<Col
						span={12}
						onClick={() => {
							setActiveTab(2);
							navigate('/profile/store');
						}}
					>
						<span className={cx("title", activeTab === 2 && "active")}>Store</span>
					</Col>
				</Row>
				<div className={cx("panel")}>
					{gameList?.map((gameName, idx) => (
						<div
							className={cx(
								"panel-item",
								gameName.gameAddress === gameSelected && "active-game"
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
			</div>

			{/* {tab.map((tab, id) => (
				<div
					className={cx("collapse")}
					key={id}
					onClick={() => {
						setActiveTab(tab.key);
						navigate(`/profile/${tab.path}`);
					}}
				>
					<div className={cx("collapse-title")} onClick={() => setShow(!show)}>
						<span>{tab.name}</span>
						{activeTab === tab.key && show ? (
							<DownOutlined style={{ fontSize: '14px' }} />
						) : (<RightOutlined style={{ fontSize: '14px' }} />)}
					</div>

					{activeTab === tab.key && show && (
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
			))} */}

		</div>
	);
};

export default Filter;
