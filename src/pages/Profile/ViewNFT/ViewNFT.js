import React, { useEffect, useState } from 'react';
import styles from './ViewNFT.module.scss';
import cn from 'classnames/bind';
import ListSkeleton from 'src/components/ListSkeleton/ListSkeleton';
import NFTItem from 'src/components/NFTItem/NFTItem';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4, 5, 6];

const ViewNFT = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<div className={cx("view-nft")}>
			<Row gutter={[20, 20]}>
				{loading ? <ListSkeleton /> : mockData.map((item, index) => (
					<Col xs={24} sm={12} md={8} key={index}>
						<NFTItem onClick={() => navigate(`/store/1`)} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default ViewNFT;