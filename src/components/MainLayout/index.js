import React, { Children, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';
import Header from '../Header';

const cx = cn.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx("main-layout")}>
			<Header />
			<div className={cx("body")}>
				<div className={cx("container")}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default MainLayout;

