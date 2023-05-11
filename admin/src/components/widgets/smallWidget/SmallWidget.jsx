import React from "react";
import classes from "./SmallWidget.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SmallWidget = () => {
  const [newUsers, setNewUsers] = useState([]);
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(baseUrl + "users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, [baseUrl]);
  return (
    <div className={classes.smallWidget}>
      <span className={classes.smallWidgetTitle}>New users</span>
      <ul className={classes.smallWidgetList}>
        {newUsers.map((user) => {
          return (
            <div key={user._id}>
              <li className={classes.smallWidgetItem}>
                <img
                  src={
                    user.profileImg
                      ? user.profileImg
                      : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  }
                  alt="new user"
                  className={classes.smallWidgetImage}
                />
                <div className={classes.smallWidgetUser}>
                  <span className={classes.smallWidgetUsername}>
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/user/" + user._id)}
                  className={classes.smallWidgetBtn}
                >
                  <VisibilityIcon
                    fontSize="small"
                    className={classes.smallWidgetBtnIcon}
                  />
                  Display
                </button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SmallWidget;
