import { useContext, useReducer, useState } from "react";
import Button from "../components/Button";
import styles from "./css/LookingForPlasma.module.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LookingForPlasma = () => {
  const [donors, setDonors] = useState([]);

  const userdata = useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = {
    state: "",
    city: "",
    bloodgroup: "",
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
      const res = await axios.post("http://127.0.0.1:5000/getplasma", {
        state: formdata.state.toLowerCase(),
        city: formdata.city.toLowerCase(),
        bloodgroup: formdata.bloodgroup,
        units: formdata.units * 1 || 1,
      });
      console.log("donors", res.data.users);
      if (res.data.users.length == 0) {
        alert("no verified donor found");
        setDonors([]);
        return;
      }
      setDonors(res.data.users);
    } catch (err) {
      console.log("error");
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
      <div className={styles.container}>
        <div className={styles.formsec}>
          <div className={styles.maintitle}>SearchFor Plasma</div>
          <form className={styles.form}>
            <div className={styles.inputs}>
              <div className={styles.stateslist}>
                <select
                  onChange={changeHandler.bind(this, "state")}
                  className={styles.dropdown}
                >
                  <option>Tamilnadu</option>
                  <option>andhra</option>
                  <option>karnataka</option>
                </select>
              </div>
              <div className={styles.citylist}>
                <select
                  className={styles.dropdown}
                  onChange={changeHandler.bind(this, "city")}
                >
                  <option>Ariyalur</option>
                  <option>Chennai</option>
                  <option>Trichy</option>
                  <option>kallakurichi</option>
                </select>
              </div>
              <div className={styles.bloodgrplist}>
                <select
                  className={styles.dropdown}
                  onChange={changeHandler.bind(this, "bloodgroup")}
                >
                  <option>A+</option>
                  <option>A-</option>
                  <option>O-</option>
                  <option>B-</option>
                  <option>B+</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O-</option>
                </select>
              </div>

              <div className={styles.citylist}>
                <select
                  className={styles.dropdown}
                  onChange={changeHandler.bind(this, "units")}
                >
                  <option disabled="true" selected="selected">
                    Unit Required
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
            <div className={styles.submitsec}>
              <Button title="Submit" onClick={clickHandler}></Button>
            </div>
          </form>
        </div>

        <div className={styles.tablesec}>
          <div className={styles.title}>Plasma Stock Availability</div>

          <div className={styles.table}>
            <div className={styles.headingsec}>
              <div className={styles.heading}>S.No</div>
              <div className={styles.heading}>Donar Name</div>
              <div className={styles.heading}>Age</div>
              <div className={styles.heading}>City</div>
              <div className={styles.heading}>Blood Group</div>
              <div className={styles.heading}>Email</div>
            </div>
            <div className={styles.valuessec}>
              {donors.map((donor, i) => {
                return (
                  <div className={styles.values}>
                    <div className={styles.displayvalues}>
                      <div className={styles.value}>{i + 1}</div>
                      <div className={styles.value}>{donor.NAME}</div>
                      <div className={styles.value}>{donor.AGE || 18}</div>
                      <div className={styles.value}>{donor.CITY}</div>
                      <div className={styles.value}>{donor.BLOODGROUP}</div>
                      <div className={styles.value}>{donor.EMAIL}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
};
export default LookingForPlasma;
