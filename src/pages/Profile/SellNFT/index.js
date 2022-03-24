import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';
import MainLayout from 'src/components/MainLayout';

const cx = cn.bind(styles);

const SellNFT = () => {
	return (
		<MainLayout>
			<div className={cx("sell-nft")}>
				<div className={cx("left")}>
					<div className={cx("image-box")}>
						<img src={`https://images.kawaii.global/kawaii-marketplace-image/items/10609012.png`} alt="" />
					</div>
				</div>

				<div className={cx("right")}>

				</div>
			</div>
		</MainLayout>
	)
}

export default SellNFT;