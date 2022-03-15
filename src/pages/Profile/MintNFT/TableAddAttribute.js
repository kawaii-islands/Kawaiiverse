import React, { useState } from 'react';
import styles from './TableAddAttribute.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import uploadImageIcon from 'src/assets/icons/uploadImage_color.svg';

const cx = cn.bind(styles);

const TableAddAttribute = ({ listAttribute, setListAttribute, setDetailAttribute, deleteAttribute }) => {
	const [imageAttribute, setImageAttribute] = useState();
	return (
		<div className={cx("table")}>
			<Row className={cx("header")}>
				<Col xs={7} className={cx("header-cell")}>Name</Col>
				<Col xs={7} className={cx("header-cell")}>Image</Col>
				<Col xs={7} className={cx("header-cell-last")}>Value</Col>
				<Col xs={3} ></Col>
			</Row>

			{listAttribute.map((item, idx) => (
				<Row className={cx("data")} key={idx}>
					<Col xs={7} className={cx("data-cell")}>
						<input
							placeholder='String'
							value={item?.type}
							className={cx("input")}
							onChange={(e) => setDetailAttribute("type", e.target.value, idx)}
						/>
					</Col>
					<Col xs={7} className={cx("data-cell")}>
						<input
							value={item?.image}
							placeholder='String'
							className={cx("input")}
							onChange={(e) => setDetailAttribute("image", e.target.value, idx)}
						/>
						<span className={cx("image-upload")}>
							<label htmlFor="file-input-attribute">
								<img src={uploadImageIcon} alt="upload-img" className={cx("upload-img-icon")} />
							</label>
							<input
								id="file-input-attribute"
								type="file"
								accept="image/*"
								onChange={(e) => setDetailAttribute("image", e.target.value.split('\\').pop(), idx)}
							/>
						</span>
					</Col>
					<Col xs={7} className={cx("data-cell-last")}>
						<input
							placeholder='String'
							value={item?.value}
							className={cx("input")}
							onChange={(e) => setDetailAttribute("value", e.target.value, idx)}
						/>
					</Col>
					<Col xs={3} >
						<DeleteOutlined
							className={cx("delete-icon")}
							onClick={() => {
								setListAttribute(listAttribute.slice(0, listAttribute.length - 1));
								deleteAttribute()
							}}
						/>
					</Col>
				</Row>
			))}
		</div>
	)
}

export default TableAddAttribute;