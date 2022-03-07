import { useState } from "react";
import logo from "src/assets/images/logo.png";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import NavModal from "./NavModal";
const cx = cn.bind(styles);

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className={cx("navbar")}>
      <div className={cx("menu-icon")} onClick={() => setOpenNav(!openNav)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={cx("left")}>
        <img src={logo} alt="Logo" className={cx("item")} />
        <div className={cx("list")}>
          <div className={cx("item")}>About</div>
          <div className={cx("item")}>Store</div>
          <div className={cx("item")}>Game</div>
        </div>
      </div>
      <div className={cx("cn-wallet")}>Connect Wallet</div>
      {openNav && <NavModal setOpenNav={setOpenNav}/>}
    </nav>
  );
};

export default Header;
