import { useState } from "react";
import logo from "src/assets/images/logo.png";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import NavModal from "./NavModal";
import ConnectWalletButton from "../ConnectWalletButton";
import { useNavigate } from 'react-router-dom';

const cx = cn.bind(styles);

const Header = () => {
	const [openNav, setOpenNav] = useState(false);
	const navigate = useNavigate();

	return (
		<nav className={cx("navbar")}>
			<div className={cx("container")}>
				<div className={cx("menu-icon")} onClick={() => setOpenNav(!openNav)}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className={cx("left")}>
					<img
						src={logo}
						alt="Logo"
						className={cx("item")}
						onClick={() => navigate("/")}
					/>
					<div className={cx("list")}>
						<div
							className={cx("item")}
							onClick={() => navigate("/about")}
						>About</div>
						<div
							className={cx("item")}
							onClick={() => navigate("/store")}
						>Store</div>
						<div
							className={cx("item")}
							onClick={() => navigate("/game")}
						>Game</div>
					</div>
				</div>
				<div className={cx("cn-wallet")}>
					<ConnectWalletButton />
				</div>
			</div>
			{openNav && <NavModal setOpenNav={setOpenNav} />}
		</nav>
	);
};

export default Header;
