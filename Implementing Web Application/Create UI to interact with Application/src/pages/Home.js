import styles from "./css/Home.module.css";
import blood from "./assets/a.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const userdata = useContext(AuthContext);
  console.log("Home", userdata);
  const navigate = useNavigate();

  const jointoday = () => {
    if (!userdata.islogedin) navigate("./signup");
    else if (
      (userdata.userdata.role != "donor") |
        (userdata.userdata.role == "admin") ||
      userdata.userdata.role == undefined
    ) {
      navigate("./wanttodonate");
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.right}>
        <div className={styles.heading}>Welcome to life Share</div>
        <div className={styles.qoute}>
          One Plasma Donation Can Save Upto Three Lives
        </div>
        <div className={styles.sub}>
          After donating blood, the body works to replenish the blood loss. This
          stimulates the production of new blood cells and in turn, helps in
          maintaining good health.
        </div>
        {userdata.role == "donor" || userdata.role == "admin" ? (
          <div></div>
        ) : (
          <div className={styles.button}>
            {" "}
            <Button title="Join Today" type="link" onClick={jointoday}></Button>
          </div>
        )}
      </div>
      <div className={styles.left}>
        <div className="img">
          <img className={styles.bloodimg} src={blood} />
        </div>
        <div className="cards">
          <div className={styles.card}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/rh-minus.png"
            />
            <div className={styles.cardqoute}>
              Donate blood and be the reason for someone’s existence
            </div>
          </div>
          <div className={styles.card}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/syringe.png"
            />
            <div className={styles.cardqoute}>
              Blood Donation Is A Great Act Of Kindness.
            </div>
          </div>
          <div className={styles.card}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/rh-plus.png"
            />
            <div className={styles.cardqoute}>
              If you want to witness a miracle, donate blood
            </div>
          </div>
        </div>
        {/* <div className={styles.circle}></div> */}
      </div>
    </div>
  );
};
export default Home;
