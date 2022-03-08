import { useWeb3React } from "@web3-react/core";
import { formatAddress } from "src/helpers";
import ConnectWalletModal from "../ConnectWalletModal";
import { useState } from "react";
import { Button } from "@mui/material";
import styles from './index.module.scss';
import cn from "classnames/bind";

const cx = cn.bind();

const ConnectWalletButton = () => {
	const { account } = useWeb3React();

	const [show, setShow] = useState(false);
	return (
		<>
			<div
				onClick={() => setShow(true)}
				className={cx("cn-wallet")}
			>
				{account ? formatAddress(account) : "Connect wallet"}
			</div>
			<ConnectWalletModal show={show} setShow={setShow} />
		</>
	);
};

export default ConnectWalletButton;
