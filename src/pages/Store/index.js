import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import MainLayout from "src/components/MainLayout";
import { InputAdornment, TextField, Input } from "@mui/material";
import searchIcon from "../../assets/icons/search_24px.svg";
import { styled } from "@mui/material/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import { Menu, Dropdown, Row, Col, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NFTItem from "../../components/NFTItem/NFTItem";
import { Outlet, useNavigate } from "react-router-dom";
import filter from "../../assets/icons/filter.svg";
import Filter from "../../components/Filter/Filter";
import FilterMobile from "../../components/FilterMobile/FilterMobile";
import ListSkeleton from "../../components/ListSkeleton/ListSkeleton";
import LoadingPage from "src/components/LoadingPage/LoadingPage";

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4, 5, 6];

const Store = () => {
	const navigate = useNavigate();
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingListNFT, setLoadingListNFT] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);

		setTimeout(() => {
			setLoadingListNFT(false);
		}, 4000);
	}, []);

	const menu = (
		<Menu>
			<Menu.Item>
				<div>1st menu item</div>
			</Menu.Item>
		</Menu>
	);

	const itemRender = (current, type, originalElement) => {
		if (type === "prev") {
			return <span style={{ color: "#FFFFFF" }}>Prev</span>;
		}
		if (type === "next") {
			return <span style={{ color: "#FFFFFF" }}>Next</span>;
		}
		return originalElement;
	};

	return (
		loading ? (<LoadingPage />) : (
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
								<div className={cx("group-button")}>
									<Dropdown overlay={menu} className={cx("drop-down")}>
										<div className={cx("drop-down-label")}>
											<span>Sort by</span> <DownOutlined />
										</div>
									</Dropdown>
									<div className={cx("button-filter")} onClick={() => setOpenFilterModal(!openFilterModal)}>
										<img src={filter} alt="filter" />
										<span style={{ paddingLeft: "8px" }}>Filter</span>
									</div>
								</div>
							</div>
						</div>

						<div className={cx("right-main")}>
							<Row gutter={[20, 20]}>
								{loadingListNFT ? <ListSkeleton /> : mockData.map((item, index) => (
									<Col xs={24} sm={12} md={8} key={index}>
										<NFTItem onClick={() => navigate(`/store/1`)} />
									</Col>
								))}
							</Row>
						</div>

						<div className={cx("pagination")}>
							<Pagination showSizeChanger={false} defaultCurrent={1} total={500} itemRender={itemRender} />
						</div>
					</div>
					{openFilterModal && <FilterMobile setOpenFilterModal={setOpenFilterModal} />}
				</div>
				<Outlet />
			</MainLayout>
		)
	);
};

export default Store;
