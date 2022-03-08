import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { error } from "src/slices/MessagesSlice";
import Grid from "@mui/material/Grid";
import styles from "./index.module.scss";
import image from "../../assets/images/store-image.png";

const Home = () => {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(error("Wrong network, please switch to mainnet"));
  //   }, []);

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.grid}>
        <Grid item xs={12} md={6}>
          <img src={image} alt="Image" className={styles.image} />
        </Grid>
        <Grid item xs={12} md={6}>
          <h1 className={styles.name}>Rockie</h1>
          <p className={styles.textTag}>
            <span className={styles.tagName}>Price:</span> <span className={styles.tagContent}>1000 KWT</span>
          </p>
          <p className={styles.textTag}>
            <span className={styles.tagName}>Description:</span>
            <span className={styles.tagContent}>
              Always full of energy unless it's hungry, healthy Rockie would hop everywhere as a way to exercise. Its
              dream is to become a rockstar with a perfect body, and only accepts Eboneys and Silvereys as its diet
              food. A well-cared Rockie can occasionally lay eggs that can be converted into stone.
            </span>
          </p>
          <p className={styles.textTag}>
            <span className={styles.tagName}>Store:</span>
            <span className={styles.tagContent}>Kawaii Island</span>
          </p>

          <div className={styles.orderButton}>Place order</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
