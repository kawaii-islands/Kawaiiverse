import { useWeb3React } from "@web3-react/core";
import { formatAddress } from "src/helpers";
import ConnectWalletModal from "../ConnectWalletModal";
import { useState } from "react";
import { Button } from "@mui/material";
import styles from './index.module.scss';
import cn from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = cn.bind();

const ConnectWalletButton = () => {
	const { account } = useWeb3React();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<div
				onClick={() => {
					account ? navigate('/profile') : setShow(true);
				}}
				className={cx("cn-wallet")}
			>
				{account ? "My account" : "Connect wallet"}
			</div>
			<ConnectWalletModal show={show} setShow={setShow} />
		</>
	);
};

export default ConnectWalletButton;
