import React, { useEffect, useState } from "react";
import LoadingPage from "src/components/LoadingPage/LoadingPage";
import MainLayout from "src/components/MainLayout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { Col, Row } from "antd";
import Filter from "src/components/Filter/Filter";
import { Button } from "@mui/material";
import ViewNFT from "./ViewNFT/ViewNFT";
import MintNFT from "./MintNFT/MintNFT";
import FilterMobile from "src/components/FilterMobile/FilterMobile";
const cx = cn.bind(styles);

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isMintNFT, setIsMintNFT] = useState(true);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <MainLayout>
      <div className={cx("profile")}>
        { openFilterModal && <FilterMobile setOpenFilterModal={setOpenFilterModal}/>}
        <Row>
          <Col md={6} className={cx("left")}>
            <Filter />
          </Col>

          <Col md={18} className={cx("right-wrapper")}>
            <div className={cx("right")}>
              <div className={cx("filter-mobile")}>
                <Button 
                onClick={() => setOpenFilterModal(!openFilterModal)}
                className={cx("filter-mobile-btn", openFilterModal && "filter-mobile-btn--active")}>Filter</Button>
              </div>
              <div className={cx("group-button")}>
                <Button className={cx("button", !isMintNFT ? "active" : "text")} onClick={() => setIsMintNFT(false)}>
                  View NFT
                </Button>
                <Button className={cx("button", isMintNFT ? "active" : "text")} onClick={() => setIsMintNFT(true)}>
                  Mint NFT
                </Button>
              </div>
              <div className={cx("content")}>{isMintNFT ? <MintNFT /> : <ViewNFT />}</div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Profile;
