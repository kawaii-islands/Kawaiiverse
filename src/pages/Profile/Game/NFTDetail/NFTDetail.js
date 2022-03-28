import React from 'react';
import styles from './NFTDetail.module.scss';

import cn from 'classnames/bind';
import MainLayout from 'src/components/MainLayout';
import { Col, Row } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';

const cx = cn.bind(styles);

const NFTDetail = () => {
	return (
		<MainLayout>
			<div className={cx("mint-nft-detail")}>
				<Row>
					<Col span={10} className={cx("left")}>
						<Button className={cx("back")}><LeftOutlined /></Button>
						<div className={cx("image-box")}>
							<img src={`https://images.kawaii.global/kawaii-marketplace-image/items/201103.png`} alt="icon" />
						</div>
					</Col>

					<Col offset={1} span={13} className={cx("right")}>
						<div className={cx("title")}>
							<span className={cx("first")}>Rockie</span>
							<span className={cx("second")}>#123456</span>
							<span className={cx("third")}>Category</span>
						</div>
						<div className={cx("content")}>
							<span className={cx("title")}>Supply:</span>
							<span className={cx("value")}>100</span>
						</div>
						<div className={cx("content")}>
							<span className={cx("title")}>Author:</span>
							<span className={cx("value")}>Name</span>
						</div>
						<div className={cx("content")}>
							<span className={cx("title")}>Description:</span>
							<span className={cx("value")}>
								Always full of energy unless it's hungry, healthy Rockie would hop everywhere as a way to exercise. Its dream is to become a rockstar with a perfect body, and only accepts Eboneys and Silvereys as its diet food. A well-cared Rockie can occasionally lay eggs that can be converted into stone.
							</span>
						</div>
					</Col>
				</Row>
			</div>
		</MainLayout>
	)
}

export default NFTDetail;