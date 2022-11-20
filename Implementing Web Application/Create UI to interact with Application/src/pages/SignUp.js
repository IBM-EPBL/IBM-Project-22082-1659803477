import Button from "../components/Button";
import styles from "./css/DonarLogin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useReducer } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const SignUp = () => {
  const userdata = useContext(AuthContext);
  const navigate = useNavigate();

  const initialState = {};
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
      const res = await axios.post("http://127.0.0.1:5000/login", {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
        cpassword: formdata.cpassword,
        phonenumber: formdata.phonenumber,
      });
      const data = res.data;
      console.log(data);
      userdata.authenticate(data.user);
      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      console.log("signup err", err);
      alert("something went wrong pls check all details");
    }
    // .then(res=>res.json()).then(res=>console.log("Responce",res)).catch(err=>{console.log("Err",err);alert("Invalid Credintials")})
  };

  return (
    <div className={styles.donatesec}>
      <div className={styles.left}>SignUp😉</div>
      <div className={styles.right}>
        <form className={styles.form}>
          <div className={styles.question}>
            <label className={styles.label}>Name</label>
            <div className={styles.inputdiv}>
              <input
                type="text"
                className={styles.input}
                onChange={changeHandler.bind(this, "name")}
              ></input>
            </div>
          </div>
          <div className={styles.question}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputdiv}>
              <input
                type="email"
                className={styles.input}
                onChange={changeHandler.bind(this, "email")}
              ></input>
            </div>
          </div>
          <div className={styles.question}>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputdiv}>
              <input
                type="number"
                className={styles.input}
                onChange={changeHandler.bind(this, "phonenumber")}
              ></input>
            </div>
          </div>
          <div className={styles.question}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputdiv}>
              <input
                type="password"
                className={styles.input}
                onChange={changeHandler.bind(this, "password")}
              ></input>
            </div>
          </div>
          <div className={styles.question}>
            <label className={styles.label}>Confirm Password</label>

            <div className={styles.inputdiv}>
              {" "}
              <input
                type="text"
                className={styles.input}
                onChange={changeHandler.bind(this, "cpassword")}
              ></input>
            </div>
          </div>

          <div className={styles.button}>
            <Button
              type="button"
              full={true}
              title="signUp"
              onClick={clickHandler}
              className={styles.input}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
