import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Filter.module.scss';
import filter from '../../../assets/icons/filter.svg';
import { Collapse } from 'antd';
import logoKawaii from '../../../assets/images/logo_kawaii.png';

const { Panel } = Collapse;
const cx = cn.bind(styles);


const Filter = () => {
	return (
		<div className={cx("filter")}>
			<div className={cx("card-header")}>
				<img src={filter} alt="filter" />
				<span className={cx("title")}>Filter</span>
			</div>
			<div className={cx("collapse")}>
				<Collapse
					defaultActiveKey={['1']}
					expandIconPosition="right"
					bordered={false}
					className="site-collapse-custom-collapse"
				>
					<Panel
						header="Games"
						key="1"
						className="site-collapse-custom-panel"
					>
						<div className={cx("panel-content")}>
							<div className={cx("name")}>
								<img src={logoKawaii} className={cx("name-avatar")} />
								<span className={cx("name-text")}>Kawaii island</span>
							</div>
							<div className={cx("name")}>
								<img src={logoKawaii} className={cx("name-avatar")} />
								<span className={cx("name-text")}>Kawaii island</span>
							</div>
						</div>
					</Panel>
					<Panel
						header="Type"
						key="2"
						className="site-collapse-custom-panel"
					>
						<div className={cx("panel-content")}>{'text'}</div>
					</Panel>
					<Panel
						header="Amount"
						key="3"
						className="site-collapse-custom-panel"
					>
						<div className={cx("panel-content")}>{'text'}</div>
					</Panel>
				</Collapse>
			</div>
		</div>
	)
}

export default Filter;

