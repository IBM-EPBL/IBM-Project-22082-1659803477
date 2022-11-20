import Button from "../components/Button";
import styles from "./css/Wanttodonate.module.css";
import heart from "./assets/heart.png";
import wave from "./assets/wave.svg";
import { useReducer, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const WantToDonate = () => {
  const userdata = useContext(AuthContext);
  console.log("userdata", userdata);
  const navigate = useNavigate();
  const initialState = {
    age: "",
    state: "",
    city: "",
    bloodgroup: "",
    lastdonateddate: "",
  };

  const reducer = (state, action) => {
    if (action.type == "UPDATE") {
      return { ...state, [action.field]: action.value };
    }
  };

  const [formdata, dispatch] = useReducer(reducer, initialState);

  const changeHandler = (label, e) => {
    console.log(formdata);
    dispatch({ type: "UPDATE", field: label, value: e.target.value });
  };

  const clickHandler = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/becomeadonor", {
        address: formdata.city,
        city: formdata.city,
        state: formdata.state,
        bloodgroup: formdata.bloodgroup,
        email: userdata.userdata.email,
      });

      console.log(res.data.message);
      alert(res.data.message);
    } catch (err) {
      console.log("/become donor err", err);
    }
  };

  if (!userdata.islogedin) {
    alert("You Should Login or Create Account");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  if (userdata.islogedin)
    return (
      <div className={styles.donatesec}>
        <div className={styles.left}>
          <div className={styles.imagesec}>
            <img src={heart} className={styles.heart} />
            <div className={styles.box}>
              <div className={styles.wavebox}>
                <img className={styles.wave} src={wave} />
              </div>
            </div>

            <div className={styles.card}>
              <img
                className={styles.icon}
                src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/rh-minus.png"
              />
              <div className={styles.cardqoute}>
                Donate blood and be the reason for someone’s existence
              </div>
            </div>

            {/* <div className={styles.card1}><img className={styles.icon} src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/syringe.png"/>
<div className={styles.cardqoute}>
Blood Donation Is A Great Act Of Kindness.
    </div>
</div> */}

            <div className={styles.card2}>
              <img
                className={styles.icon}
                src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/rh-plus.png"
              />
              <div className={styles.cardqoute}>
                If you want to witness a miracle, donate blood
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form}>
            <div className={styles.question}>
              <label className={styles.label}>Age</label>
              <div className={styles.inputdiv}>
                <input
                  type="number"
                  onChange={changeHandler.bind(this, "age")}
                  className={styles.input}
                ></input>
              </div>
            </div>
            <div className={styles.question}>
              <label className={styles.label}>State</label>

              <div className={styles.inputdiv}>
                {" "}
                <input
                  type="text"
                  className={styles.input}
                  onChange={changeHandler.bind(this, "state")}
                  placeholder="Tamilnadu"
                ></input>
              </div>
            </div>
            <div className={styles.question}>
              <label className={styles.label}>City</label>

              <div className={styles.inputdiv}>
                {" "}
                <input
                  type="text"
                  onChange={changeHandler.bind(this, "city")}
                  placeholder="Ariyalur"
                  className={styles.input}
                ></input>
              </div>
            </div>
            <div className={styles.question}>
              <label className={styles.label}>Blood Group</label>

              <div className={styles.inputdiv}>
                {" "}
                <input
                  type="text"
                  placeholder="A+,B-"
                  onChange={changeHandler.bind(this, "bloodgroup")}
                  className={styles.input}
                ></input>
              </div>
            </div>
            {/* <div className={styles.question}>
    <label  className={styles.label}>Last Donated Date</label>

  
    <div className={styles.inputdiv}> <input type="date"className={styles.input}  onChange={changeHandler.bind(this,'lastdonateddate')}  ></input></div>
    
    </div> */}

            <div className={styles.button}>
              <Button
                full={true}
                title="submit"
                className={styles.input}
                onClick={clickHandler}
              ></Button>
            </div>
          </form>
          {/* <div className={styles.blood}></div> */}
        </div>
      </div>
    );
};
export default WantToDonate;
