import styles from "./Navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const [hoverd, setHoverd] = useState(false);

  const userdata = useContext(AuthContext);

  const logout = async () => {
    console.log("logginf out", userdata.islogedin);
    const res = await fetch("http://127.0.0.1:5000/logout");
    const msg = await res.json();
    alert(`${msg.message}`);
    userdata.logout();
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <NavLink className={styles.logoname} to="/">
            🩸LifeStream
          </NavLink>
        </div>
        <div className={styles.options}>
          <div>
            <NavLink
              to="/lookforplasma"
              className={({ isActive }) =>
                [styles.navoption, isActive ? styles.active : ""].join(" ")
              }
            >
              {" "}
              Looking For Plasma
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/wanttodonate"
              className={({ isActive }) =>
                [styles.navoption, isActive ? styles.active : ""].join(" ")
              }
            >
              {" "}
              Want To Donate Plasma
            </NavLink>
          </div>
          {
            !userdata.islogedin ? (
              <div className={styles.login}>
                <div
                  className={styles.loginlabel}
                  onClick={() => {
                    setHoverd((prev) => !prev);
                    console.log(hoverd);
                  }}
                >
                  login
                </div>
                <div
                  className={[
                    styles.loginoptions,
                    hoverd ? styles.loginactive : "",
                  ].join(" ")}
                  onMouseLeave={() => {
                    setHoverd(false);
                    console.log(hoverd);
                  }}
                  onMouseEnter={() => {
                    setHoverd(true);
                    console.log(hoverd);
                  }}
                >
                  <NavLink to="/donarlogin" className={styles.loginoption}>
                    User Login
                  </NavLink>
                  {/* <NavLink to='/bloodbanklogin' className={styles.loginoption}>Blood Bank Login</NavLink> */}
                  <NavLink to="/adminlogin" className={styles.loginoption}>
                    Admin Login
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className={styles.avatarsec}>
                <NavLink to="/profile">
                  <img
                    className={styles.avatar}
                    src="https://img.icons8.com/bubbles/100/null/user-male-circle.png"
                  />
                </NavLink>
              </div>
            )
            //<div onClick={logout}>logout</div>
          }
          {userdata.islogedin && (
            <div className={styles.logout} onClick={logout}>
              logout
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
