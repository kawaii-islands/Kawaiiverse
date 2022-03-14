import React, { useEffect, useState } from 'react';
import styles from './MintNFTBox.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import subtractIcon from 'src/assets/icons/subtract.svg';
import uploadImageIcon from 'src/assets/icons/uploadImage.svg';
import plusCircleIcon from 'src/assets/icons/plus_circle.svg';
import TableAddAttribute from './TableAddAttribute';
import inforIcon from 'src/assets/icons/InforIcon.svg';
import { Button, IconButton, Input } from '@mui/material';

const cx = cn.bind(styles);

const mockData = [1, 2, 3, 4, 5, 6];

const MintNFTBox = ({ setOpenMintNFTBox }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [nftImageUrl, setNftImageUrl] = useState("string");
	const [imageName, setImageName] = useState();
	const [listAttribute, setListAttribute] = useState(['1']);

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
				<Row className={cx("row")}>
					<Col md={5} className={cx("one-field")}>
						<div className={cx("title")}>Author: </div>
						<input
							value={nftImageUrl}
							className={cx("input")}
							onChange={(e) => setNftImageUrl(e.target.value)}
						/>
					</Col>
					<Col md={5} className={cx("one-field")}>
						<div className={cx("title")}>URL: </div>
						<input
							value={nftImageUrl}
							className={cx("input")}
							onChange={(e) => setNftImageUrl(e.target.value)}
						/>
					</Col>
					<Col md={5} className={cx("one-field")}>
						<div className={cx("title")}>Rarity: </div>
						<input
							value={nftImageUrl}
							className={cx("input")}
							onChange={(e) => setNftImageUrl(e.target.value)}
						/>
					</Col>
					<Col md={7} className={cx("one-field")}>
						<div className={cx("title")}>Upload image: </div>
						<input
							value={imageName}
							placeholder="image url"
							className={cx("input")}
							onChange={(e) => setNftImageUrl(e.target.value)}
						/>
					</Col>
					<Col md={2} className={cx("one-field")}>
						<div className={cx("title")}>or: </div>
						<div className={cx("image-upload")}>
							<label htmlFor="file-input">
								<img src={uploadImageIcon} alt="upload-img" className={cx("upload-img-icon")} />
							</label>
							<input
								id="file-input"
								type="file"
								accept="image/*"
								onChange={(e) => setImageName(e.target.value.split('\\').pop())}
							/>
						</div>
					</Col>
				</Row>

				<Row className={cx("row")} style={{ padding: '24px 0px' }}>
					<Col span={24} className={cx("one-field")} style={{ alignItems: 'baseline' }}>
						<div className={cx("title")}>Description: </div>
						<textarea
							value={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel massa est. Nulla facilisi. Suspendisse euismod enim nec ipsum bibendum, ultricies rutrum nisl tincidunt.`}
							className={cx("input")}
							onChange={(e) => setNftImageUrl(e.target.value)}
							style={{ width: '100%' }}
							rows={2}
						/>
					</Col>
				</Row>

				<Row className={cx("row")}>
					<Col span={24} className={cx("one-field")} style={{ alignItems: 'baseline' }}>
						<div className={cx("title")}>
							Attributes: &nbsp;
							<img
								src={plusCircleIcon}
								alt="upload-img"
								style={{ cursor: 'pointer' }}
								onClick={() => setListAttribute([...listAttribute, '1'])}
							/>
						</div>
						<div className={cx("table")}>
							<TableAddAttribute
								listAttribute={listAttribute}
								setListAttribute={setListAttribute}
							/>
						</div>
					</Col>
				</Row>
			</div>

			<div className={cx("box-bottom")}>
				<div className={cx("left")}>
					<img src={inforIcon} alt="infor-icon" /> &nbsp;
					<span>You can double click to edit the information</span>
				</div>
				<div className={cx("right")}>
					<Button className={cx("confirm")}>Confirm</Button>
					<Button className={cx("delete")}>Delete</Button>
				</div>
			</div>
		</div>
	);
}

export default MintNFTBox;