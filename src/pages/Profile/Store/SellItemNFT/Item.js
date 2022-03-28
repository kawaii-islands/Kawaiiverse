import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {  CloseOutlined } from "@ant-design/icons"
import { Col, Row } from "antd";
import cn from "classnames/bind";
import styles from "./Item.module.scss";
import noImage from "src/assets/images/no-image.png"
const cx = cn.bind(styles);

const Item = ({list, listSell, setListSell}) => {
  const [searchString, setSearchString] = useState("");
  const [listSearch, setListSearch] = useState([])
  const [nft, setNft] = useState({});
  const [info, setInfo] = useState({
    price: 0,
    quantity: 0,
  })
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchString(value) 
    if(value === ""){
      setListSearch([])
    }
    else{
      const listSearch = list.filter(nft => {
        return (nft._id.indexOf(value) > -1) || (nft.name.indexOf(value) > -1)
      })
      setListSearch(listSearch);
    }
    
  }
  const addNft = (id) => {
    const nft = list.filter(nft => nft._id === id)[0];
    setNft(nft);
    setInfo({
      price: 0,
      quantity: nft.supply
    })
    setListSearch([]);
    setListSell([...listSell, nft])
  }
  const handleInput = (e) => {
    
    setInfo({...info, [e.target.name]: e.target.value});
    let index;
    const updateNft = list.filter((item, idx) => {
      index = idx;
      return item._id === nft._id
    });
    updateNft[0][e.target.name] = e.target.value;
    const newList = listSell.map((item,idx) => {
      if(idx === index){
        item = updateNft[0];
      }
      return item;
    })
    setListSell(newList);
  }
  const changePrice = (name) => {
    let index;
    const updateNft = list.filter((item, idx) => {
      index = idx;
      return item._id === nft._id
    });
    if(name === "minus"){
      setInfo({...info, quantity: Math.max(info.quantity - 1, 0)})
      updateNft[0]["quantity"] = Math.max(info.quantity - 1, 0);
    }
    if(name === "plus"){
      setInfo({...info, quantity: Math.min(info.quantity + 1, 100)})
      updateNft[0]["quantity"] = Math.min(info.quantity + 1, 100);
    }
    const newList = listSell.map((item,idx) => {
      if(idx === index){
        item = updateNft[0];
      }
      return item;
    })

    setListSell(newList);
  }
  return (
    <>
    <Row className={cx("table-body-header")}>
      <Col span={12} style={{ textAlign: "center" }}>
        {nft._id  ? <div className={cx("nft-image")}>
          <CloseOutlined 
          className={cx("nft-image-close")}
          onClick={() => {
            setNft({});
            setInfo({price: 0, quantity: 0})
          }}
          />

        <img src={nft.imageUrl || noImage} alt=""/></div> : <input 
        type="search" 
        placeholder="Seach name or ID" 
        className={cx("search-input")} 
        value={searchString}
        onChange={handleSearch}
        />}
      </Col>
      <Col span={4}><input 
      placeholder="---------" 
      className={cx("price-input")} 
      value={info.price}
      type="number" 
      onChange={handleInput}
      name="price"/></Col>
      <Col span={7}>
        <div className={cx("quantity")}>
          <div className={cx("quantity-btn", "quantity-minus")} 
          onClick={() => changePrice("minus")}
          >-</div>
          <input 
          value={info.quantity}  
          min={0}
          max={info.quantity}
          name="quantity" 
          onChange={handleInput}/>
          <div className={cx("quantity-btn", "quantity-plus")}
          name="plus"
          onClick={() => changePrice("plus")}
          >+</div>
        </div>
      </Col>
      <Col span={1}>
        <input type="checkbox" />
      </Col>
    </Row>
    <Row className={cx("result")}>
    {listSearch.map(nft => <div 
    className={cx("result-nft")} 
    onClick={() => addNft(nft._id)}
    key={nft._id}
    >
        {/* <CloseOutlined className={cx("result-nft-close")}/> */}
        <img src={nft.imageUrl || noImage} alt=""/>
      </div>)}
      
    </Row>
    </>
  );
};
export default Item;
