import React, { useEffect, useState } from "react";
import styles from "./ViewNFT.module.scss";
import cn from "classnames/bind";
import ListSkeleton from "src/components/ListSkeleton/ListSkeleton";
import NFTItem from "src/components/NFTItem/NFTItem";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = cn.bind(styles);

const URL = "http://159.223.81.170:3000";

const ViewNFT = ({ gameSelected }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [listNftByContract, setListNftByContract] = useState();

	useEffect(() => {
		getListNftByContract();
	}, [gameSelected]);

	const getListNftByContract = async () => {
		setLoading(true);

		try {
			const res = await axios.get(`${URL}/v1/nft/${gameSelected}`);

			if (res.status === 200) {
				setListNftByContract(res.data.data);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={cx("view-nft")}>
			<Row gutter={[20, 20]}>
				{loading ? (
					<ListSkeleton />
				) : (
					listNftByContract.map((item, index) => (
						<Col xs={24} sm={12} md={8} key={index}>
							<NFTItem data={item} />
						</Col>
					))
				)}
			</Row>
		</div>
	);
};

export default ViewNFT;
