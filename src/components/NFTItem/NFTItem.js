import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./NFTItem.module.scss";
import logoKawaii from "../../assets/images/logo_kawaii.png";
import Web3 from "web3";
import { BSC_rpcUrls } from "src/consts/blockchain";

const cx = cn.bind(styles);
const web3 = new Web3(BSC_rpcUrls);

const NFTItem = ({ onClick, data }) => {
  console.log(Number(web3.utils.fromWei(data.price.toString())));

  return (
    <div className={cx("nft-item")} onClick={onClick}>
      <div
        className={cx("top")}
        style={{
          backgroundImage: data?.imageUrl
            ? `url(${data.imageUrl})`
            : `url(https://images.kawaii.global/kawaii-marketplace-image/items/205002.png)`,
        }}
      >
        <div className={cx("tag")}>
          {data.amount - data.alreadySale}/{data.amount} Left
        </div>
      </div>

      <div className={cx("bottom")}>
        <div className={cx("name")}>
          <img src={logoKawaii} className={cx("name-avatar")} />
          <span className={cx("name-text")}>Kawaii island</span>
        </div>
        <div className={cx("title")}>{data?.name || "Name"}</div>
        <div className={cx("number-box")}>
          <span className={cx("number")}>{Number(web3.utils.fromWei(data.price.toString()))} KWT</span>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
