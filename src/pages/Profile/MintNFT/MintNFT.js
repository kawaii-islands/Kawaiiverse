import React, { useEffect, useState } from 'react';
import styles from './MintNFT.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';
import plusIcon from 'src/assets/icons/plus.svg';
import MintNFTBox from './MintNFTBox';

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4];

const MintNFT = () => {
	const [loading, setLoading] = useState(true);
	const [openMintNFTBox, setOpenMintNFTBox] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<div className={cx("mint-nft")}>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={3} style={{ textAlign: 'center' }}>NFT</Col>
					<Col span={4}>Name</Col>
					<Col span={4}>TokenID</Col>
					<Col span={4}>Supply</Col>
					<Col span={4}>Category</Col>
					<Col span={4}>Preview</Col>
					<Col span={1}></Col>
				</Row>

				{
					mockData.map((item, index) => openMintNFTBox === index ?
						(<MintNFTBox
							data={item}
							setOpenMintNFTBox={setOpenMintNFTBox}
						/>)
						: (
							<Row
								className={cx("table-row")}
								key={index}
								onClick={() => setOpenMintNFTBox(openMintNFTBox === index ? null : index)}
							>
								<Col span={3} style={{ textAlign: 'center' }}>
									<img
										src={`https://images.kawaii.global/kawaii-marketplace-image/category/${"Icon_Plant_Big"}.png`}
										alt="nft-icon"
										width={36}
										height={36}
									/>
								</Col>
								<Col span={4}>
									string
								</Col>
								<Col span={4}>string</Col>
								<Col span={4}>string</Col>
								<Col span={4}>string</Col>
								<Col span={4} className={cx("preview")}>http://abc</Col>
								<Col
									span={1}
									style={{ cursor: 'pointer' }}
								>
									<img
										src={plusIcon}
										alt="plus-icon"
									/>
								</Col>
							</Row>
						))
				}
			</div>
		</div>
	);
}

export default MintNFT;