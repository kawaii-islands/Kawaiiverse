import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import ViewItemNFT from "./ViewItemNFT";
import SellItemNFT from "./SellItemNFT";

const cx = cn.bind(styles);

const StoreProfile = ({ gameSelected }) => {
  const [isSellNFT, setIsSellNFT] = useState(true);

  return (
    <div className={cx("profile")}>
      <div className={cx("right")}>
        <div className={cx("group-button")}>
          <Button className={cx("button", !isSellNFT ? "active" : "text")} onClick={() => setIsSellNFT(false)}>
            View NFT
          </Button>
          <Button className={cx("button", isSellNFT ? "active" : "text")} onClick={() => setIsSellNFT(true)}>
            Sell NFT
          </Button>
        </div>
        <div className={cx("content")}>
          {isSellNFT ? <SellItemNFT gameSelected={gameSelected} /> : <ViewItemNFT gameSelected={gameSelected} />}
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
