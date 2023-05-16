import React, { useEffect, useState, useContext } from "react";
import classes from "./User.module.css";
import { Person, AlternateEmail, Upload } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../../../store/userContext/apiCalls";
import { UserContext } from "../../../store/userContext/UserContext";
import uploadFiles from "../../../filesUpload";

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({Admin: false});
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  const [profileImg, setProfileImg] = useState("");
  const [validUpload, setValidUpload] = useState(1);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(baseUrl + "users/" + userId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUser(res.data);
        const { _id, ...userData } = res.data;
        setUserInfo({ ...userData });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [baseUrl, userId]);

  const validateForm = () => {
    const { username, email, password } = userInfo;
    if (!username || !email || !password) {
      return true;
    }
    return false;
  };

  const handleSelect = (e) => {
    let admin = false;
    if (e.target.name === "Admin") {
      admin = e.target.value === "true" && true;
    }
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.name]: admin,
      };
    });
  };

  const handleChange = (e) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadFiles(
      [{ file: profileImg, label: "profileImg" }],
      setUserInfo,
      setValidUpload
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateUser(userId, userInfo, dispatch);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.user}>
      <div className={classes.userTopContainer}>
        <h2 className={classes.userTitle}>Edit User</h2>
        <Link to="/newUser">
          <button className={classes.userAddbtn}>Add User</button>
        </Link>
      </div>
      <div className={classes.userMainContainer}>
        <div className={classes.userDetails}>
          <div className={classes.userDetailsTop}>
            <img
              className={classes.userDetailsTopImg}
              src={user.profileImg}
              alt="user"
            />
            <div className={classes.userDetailsTopInfo}>
              <span className={classes.userDetailsTopUsername}>User Data:</span>
            </div>
          </div>
          <div className={classes.userDetailsMain}>
            <span className={classes.userDetailsMainTitle}>
              Account Details
            </span>
            <div className={classes.userDetailsMainInfo}>
              <Person
                fontSize="small"
                className={classes.userDetailsMainIcon}
              />
              <span className={classes.userDetailsMainHandle}>
                {user.username}
              </span>
            </div>
            <div className={classes.userDetailsMainInfo}>
              <AlternateEmail
                fontSize="small"
                className={classes.userDetailsMainIcon}
              />
              <span className={classes.userDetailsMainHandle}>
                {user.email}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.userUpdate}>
          <span className={classes.userUpdateTitle}>Edit</span>
          <form className={classes.useUpdateForm}>
            <div className={classes.userUpdateLeft}>
              <div className={classes.userupdateItem}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  defaultValue={user.username}
                  className={classes.userUpdateInput}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.userupdateItem}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  className={classes.userUpdateInput}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.userupdateItem}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="text"
                  name="password"
                  defaultValue={user.password}
                  className={classes.userUpdateInput}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.userupdateItem}>
                <label htmlFor="select">Admin</label>
                <select
                  className={classes.userUpdateInput}
                  name="Admin"
                  id="admin"
                  onChange={handleSelect}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>
            <div className={classes.userUpdateRight}>
              <div className={classes.userUpdateUpload}>
                <img
                  className={classes.userUpdateImg}
                  src={user.profileImg}
                  alt="User"
                />
                <label htmlFor="file">
                  <Upload fontSize="large" className={classes.userUpdateIcon} />
                </label>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setProfileImg(event.target.files[0]);
                    setValidUpload((prev) => prev - 1);
                  }}
                />
              </div>
              {validUpload === 1 ? (
                <button
                  disabled={validateForm()}
                  className={classes.userUpdateBtn}
                  onClick={handleSubmit}
                >
                  Update user
                </button>
              ) : (
                <button
                  disabled={!profileImg}
                  className={classes.userUpdateBtn}
                  onClick={handleUpload}
                >
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
