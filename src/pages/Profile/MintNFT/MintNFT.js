import React, { useEffect, useState } from 'react';
import styles from './MintNFT.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';
import plusIcon from 'src/assets/icons/plus.svg';
import MintNFTBox from './MintNFTBox';
import { Button } from '@mui/material';

const cx = cn.bind(styles);

const MintNFT = () => {
	const [loading, setLoading] = useState(true);
	const [openMintNFTBox, setOpenMintNFTBox] = useState(0);
	const [listNft, setListNft] = useState(['1', '2', '3']);
	const [oneNft, setOneNft] = useState({
		"type": "",
		"tokenId": 1,
		"author": "canhtuan",
		"name": "String",
		"description": "String",
		"uri": "String",
		"mimeType": "String",
		"imageUrl": "String",
		"imageThumbnailUrl": "String",
		"imagePreviewUrl": "String",
		"tags": [
			"String"
		],
		"attributes": [
			{
				"type": "String",
				"value": "String"
			}
		],
		"rarity": "String",
		"supply": 100,
		"category": "String",
	})

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	const submitListNFT = async () => {
		let bodyParams = {
			"nft1155": "0xD6eb653866F629e372151f6b5a12762D16E192f5",
			"owner": "0x3A93dA588954AcF4D0d8F1f1A4439Fa79D84Cf29",
			"sign": "0xb089893bcce9375236b4c3932c8e8451cb463259bc863f26ca32824a0ded041d49a538e49d5dcbc3ce86764bab3d694f07a174ffda1dcab08911117cddad7d581c",
			"data": [],
		}
	}

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
					listNft.map((item, index) => openMintNFTBox === index ?
						(<MintNFTBox
							key={index}
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

				<div className={cx("group-button")}>
					<Button className={cx("submit")}>Submit</Button>
					<Button
						className={cx("create-nft")}
						onClick={() => {
							setListNft([...listNft, '1']);
							setOpenMintNFTBox(listNft.length);
						}}
					>
						<img
							src={plusIcon}
							alt="plus-icon"
						/> &nbsp;
						Create NFT
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MintNFT;