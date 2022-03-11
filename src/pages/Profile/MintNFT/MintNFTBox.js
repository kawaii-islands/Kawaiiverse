import React, { useEffect, useState } from 'react';
import styles from './MintNFTBox.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import subtractIcon from 'src/assets/icons/subtract.svg';

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4, 5, 6];

const MintNFTBox = ({ setOpenMintNFTBox }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [nftImageUrl, setNftImageUrl] = useState("string");

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<div className={cx("mintNFT-box")}>
			<Row className={cx("first-row")}>
				<Col span={3} style={{ textAlign: 'center' }}>
					<input
						value={nftImageUrl}
						className={cx("input-1")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col span={4}>
					<input
						value={nftImageUrl}
						className={cx("input")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col span={4}>
					<input
						value={nftImageUrl}
						className={cx("input")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col span={4}>
					<input
						value={nftImageUrl}
						className={cx("input")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col span={4}>
					<input
						value={nftImageUrl}
						className={cx("input")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col span={4} className={cx("preview")}>
					<input
						value={nftImageUrl}
						className={cx("input")}
						onChange={(e) => setNftImageUrl(e.target.value)}
					/>
				</Col>
				<Col
					span={1}
					style={{ cursor: 'pointer' }}
					onClick={() => setOpenMintNFTBox(null)}
				>
					<img
						src={subtractIcon}
						alt="plus-icon"
					/>
				</Col>
			</Row>

			<div className={cx("main-box")}>

			</div>
		</div>
	);
}

export default MintNFTBox;