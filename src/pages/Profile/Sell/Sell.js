import cn from "classnames/bind";
import styles from "./Sell.module.scss";
import { Col, Row, Spin } from "antd";
import nftImage from "src/assets/images/store-image.png";
import { CloseCircleOutlined } from '@ant-design/icons';

const cx = cn.bind(styles);
const array = [1, 2, 3, 4, 5, 6];
const Sell = () => {
  return (
    <div className={cx("table")}>
      <Row className={cx("table-header")}>
        <Col span={3} style={{ textAlign: "center" }}>
          NFT
        </Col>
        <Col span={3}>Name</Col>
        <Col span={4}>TokenId</Col>
        <Col span={3}>Supply</Col>
        <Col span={4} >
            Price/NFT
            </Col>
        <Col span={5} className={cx("quantity")}>Quantity</Col>
        <Col span={1}></Col>
      </Row>
      <div className={cx("table-body")}>
        {array.map(item => (
          <Row className={cx("first-row")} key={`fake-array-${item}`}>
            <Col span={3} style={{ textAlign: "center" }}>
              <img src={nftImage} alt="example-nft" />
            </Col>
            <Col span={3}>String</Col>
            <Col span={4}>String</Col>
            <Col span={3}>20</Col>
            <Col span={4}>100 KWT</Col>
            <Col span={5}>
                <div className={cx("quantity")}>
                    <div className={cx("quantity-btn","quantity-minus")}>-</div>
                    <input value={20} />
                    <div className={cx("quantity-btn","quantity-plus")}>+</div>
                </div>
            </Col>
            <Col span={1}>
              <div className={cx("act-hide")}>Hide</div>
              <CloseCircleOutlined className={cx("act-hide-mobile")} />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};
export default Sell;
