import Button from "../components/Button";
import styles from "./css/DonarLogin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useReducer, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const DonarLogin = () => {
  const userdata = useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const reducer = (state, action) => {
    if (action.type == "UPDATE") {
      return { ...state, [action.field]: action.value };
    }
  };

  const [formdata, dispatch] = useReducer(reducer, initialState);

  const changeHandler = (label, e) => {
    dispatch({ type: "UPDATE", field: label, value: e.target.value });
  };

  const clickHandler = async () => {
    console.log("form", formdata);
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email: formdata.email,
        password: formdata.password,
      });

      console.log("res", res);
      userdata.authenticate(res.data.user);
      navigate("/");
    } catch (err) {
      alert(`${err.response?.data}`);
    }
  };

  return (
    <div className={styles.donatesec}>
      <div className={styles.left}>donarLogin🙃</div>
      <div className={styles.right}>
        <form className={styles.form} autoComplete="on">
          <div className={styles.question}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputdiv}>
              <input
                type="text"
                onChange={changeHandler.bind(this, "email")}
                className={styles.input}
              ></input>
            </div>
          </div>
          <div className={styles.question}>
            <label className={styles.label}>Password</label>

            <div className={styles.inputdiv}>
              {" "}
              <input
                type="password"
                onChange={changeHandler.bind(this, "password")}
                className={styles.input}
              ></input>
            </div>
          </div>

          <div className={styles.button}>
            <Button
              full={true}
              title="Login"
              onClick={clickHandler}
              className={styles.input}
            ></Button>
            <NavLink to="/signup">Create a Acount</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DonarLogin;
