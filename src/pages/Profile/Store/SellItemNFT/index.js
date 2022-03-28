import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import { Col, Row } from "antd";
import { toast } from "react-toastify";
import Item from "./Item";
const cx = cn.bind(styles);

const SellItemNFT = () => {
  const [list, setList] = useState([]);
  const [rowItem, setRowItem] = useState(1);
  const [listSell, setListSell] = useState([]);
  useEffect(() => {
    getListNft();
  }, []);

  const getListNft = async () => {
    try {
      const res = await axios.get('http://159.223.81.170:3000/v1/nft/0xD6eb653866F629e372151f6b5a12762D16E192f5');
      if(res.status === 200){
        setList(res.data.data);
      }else{
        toast.error("Cannot get list Nft")
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  const addItem = () => {
    setRowItem(rowItem + 1);
  }
  const sellNft = () => {
    console.log(listSell);
  }
  return ( 
    <div className={cx("table")}>
      <Row className={cx("table-header")}>
        <Col span={12} style={{ textAlign: "center" }}>
          NFT
        </Col>
        <Col span={4}>Price/NFT</Col>
        <Col span={7}>Quantity</Col>
        <Col span={1}>
          <input type="checkbox" />
        </Col>
      </Row>
      <div className={cx("table-body")}>
        {new Array(rowItem).fill().map(i => <Item list={list} listSell={listSell} setListSell={setListSell}/>)}
      </div>
      <div className={cx("wrapper-btn")}>
        <Button 
        className={cx("wrapper-btn--sell")}
        onClick={sellNft}
        >SELL NFT</Button>
        <Button 
        className={cx("wrapper-btn--add")}
        onClick={addItem}
        >ADD NFT</Button>
      </div>
    </div>
  );
};

export default SellItemNFT;
