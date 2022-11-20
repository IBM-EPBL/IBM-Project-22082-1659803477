import styles from "./css/Profile.module.css";

import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Profile = () => {
  const userdata = useContext(AuthContext);

  console.log("profile", userdata);

  return (
    <div className={styles.profilesec}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          src="https://img.icons8.com/fluency/240/null/user-male-circle.png"
        />
        <div className={styles.name}>{userdata.userdata.name}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.heading}>Account Settings</div>
        <div className={styles.details}>
          <div className={styles.labels}>
            <div className={styles.label}>Name</div>
            <div className={styles.label}>Email</div>
            <div className={styles.label}>State</div>
            <div className={styles.label}>City</div>
            <div className={styles.label}>Blood Group</div>
            <div className={styles.label}>Role</div>
          </div>
          <div className={styles.values}>
            <div className={styles.value}>{userdata.userdata.name}</div>
            <div className={styles.value}>{userdata.userdata.email}</div>
            <div className={styles.value}>
              {userdata.userdata.state || "--"}
            </div>
            <div className={styles.value}>{userdata.userdata.city || "--"}</div>
            <div className={styles.value}>
              {userdata.userdata.bloodgroup || "--"}
            </div>
            <div className={styles.value}>{userdata.userdata.role || "--"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
