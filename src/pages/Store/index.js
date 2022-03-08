import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';
import MainLayout from 'src/components/MainLayout';
import Filter from './Filter/Filter';
import { InputAdornment, TextField, Input } from '@mui/material';
import searchIcon from "../../assets/icons/search_24px.svg";
import { styled } from "@mui/material/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import { Menu, Dropdown, Row, Col, Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import NFTItem from './NFTItem/NFTItem';

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4, 5, 6];

const Store = () => {
	const menu = (
		<Menu>
			<Menu.Item>
				<div>
					1st menu item
				</div>
			</Menu.Item>
		</Menu>
	);

	const itemRender = (current, type, originalElement) => {
		if (type === 'prev') {
			return <span style={{ color: '#FFFFFF' }}>Prev</span>;
		}
		if (type === 'next') {
			return <span style={{ color: '#FFFFFF' }}>Next</span>;
		}
		return originalElement;
	}

	return (
		<MainLayout>
			<div className={cx("store")}>
				<div className={cx("left")}>
					<Filter />
				</div>
				<div className={cx("right")}>
					<div className={cx("right-top")}>
						<div className={cx("right-top-title")}>2000 items</div>
						<div className={cx("group-search")}>
							<Input
								disableUnderline
								placeholder="Search for NFT"
								className={cx("search")}
								// value={searchInput}
								// onChange={(e) => {
								// 	setSearchInput(e.target.value);
								// }}
								// onKeyDown={(e) => {
								// 	if (e.key === "Enter" || e.keyCode === 13) {
								// 		setShowModalSearch(false);
								// 		return filterInput();
								// 	}
								// }}
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon className={cx("icon")} />
									</InputAdornment>
								}
							/>
							<Dropdown overlay={menu} className={cx("drop-down")}>
								<div className={cx("drop-down-label")}>
									<span>Hover me</span> <DownOutlined />
								</div>
							</Dropdown>
						</div>
					</div>

					<div className={cx("right-main")}>
						<Row gutter={[20, 20]}>
							{mockData.map((item, index) => (
								<Col md={8} key={index}>
									<NFTItem />
								</Col>
							))}
						</Row>
					</div>

					<div className={cx("pagination")}>
						<Pagination
							showSizeChanger={false}
							defaultCurrent={1}
							total={500}
							itemRender={itemRender}
						/>
					</div>

				</div>
			</div>
		</MainLayout>
	)
}

export default Store;

