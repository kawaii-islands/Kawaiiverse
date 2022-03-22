import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './NFTItem.module.scss';
import logoKawaii from '../../assets/images/logo_kawaii.png';

const cx = cn.bind(styles);

const NFTItem = ({ onClick, data }) => {

	return (
		<div className={cx("nft-item")} onClick={onClick}>
			<div
				className={cx("top")}
				style={{
					backgroundImage:
						data?.imageUrl ? `url(${data.imageUrl})`
							: `url(https://images.kawaii.global/kawaii-marketplace-image/items/205002.png)`
				}}
			>
				<div className={cx("tag")}>
					10/100 Left
				</div>
			</div>

			<div className={cx("bottom")}>
				<div className={cx("name")}>
					<img src={logoKawaii} className={cx("name-avatar")} />
					<span className={cx("name-text")}>Kawaii island</span>
				</div>
				<div className={cx("title")}>{data?.name || "Name"}</div>
				<div className={cx("number-box")}>
					<span className={cx("number")}>375 KWT</span>
				</div>
			</div>
		</div>
	)
}

export default NFTItem;

