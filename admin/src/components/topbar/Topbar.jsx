import React from "react";
import classes from "./Topbar.module.css";
import {
  NotificationsNone,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext/AuthContext";
import avatar from "../../images/formal.jpg";
import { logout } from "../../store/authContext/AuthActions";

const Topbar = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <div className={classes.topbar}>
      <div className={classes.topbarInner}>
        <div className={classes.topbarLeft}>
          <span className={classes.logo}>Admin Dashboard</span>
        </div>
        <div className={classes.topbarRight}>
          <div className={classes.rightInner}>
            <button
              onClick={() => dispatch(logout())}
              className={classes.logoutBtn}
            >
              <Logout />
            </button>
          </div>
          <div className={classes.rightInner}>
            <NotificationsNone fontSize="large" />
            <span className={classes.badgeIcon}>3</span>
          </div>
          <div className={classes.rightInner}>
            <Settings fontSize="large" />
          </div>
          <img className={classes.topbarAvtr} alt="avatar" src={avatar}></img>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
