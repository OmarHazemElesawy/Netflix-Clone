import React, { useState, useContext } from "react";
import classes from "./NewUser.module.css";
import uploadFiles from "../../../filesUpload";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../store/userContext/apiCalls";
import { UserContext } from "../../../store/userContext/UserContext";
import profileFallback from "../../../images/neflix_profile.png"
const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    Admin: false,
    profileImg: profileFallback,
  });
  const [profileImg, setProfileImg] = useState("");
  const [validUpload, setValidUpload] = useState(1);
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, password } = userInfo;
    if (!username || !email || !password) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
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
      createUser(userInfo, dispatch);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.newUser}>
      <h1 className={classes.newUserTitle}>New User</h1>
      <form className={classes.newUserForm}>
        <div className={classes.newUserItem}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="JaneDoe123"
            className={classes.newUserInput}
            onChange={handleChange}
          />
        </div>
        <div className={classes.newUserItem}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password"
            className={classes.newUserInput}
            onChange={handleChange}
          />
        </div>
        <div className={classes.newUserItem}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="JaneDoe@gmail.com"
            className={classes.newUserInput}
            onChange={handleChange}
          />
        </div>
        <div className={classes.newUserItem}>
          <label htmlFor="profileImg">Profile Image:</label>
          <input
            id="profileImg"
            name="profileImg"
            type="file"
            onChange={(event) => {
              setProfileImg(event.target.files[0]);
              setValidUpload((prev) => prev - 1);
            }}
          />
        </div>
        <div className={classes.newUserItem}>
          <label htmlFor="select">Admin</label>
          <select
            className={classes.addListSelect}
            name="Admin"
            id="admin"
            onChange={handleSelect}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        {validUpload === 1 ? (
          <button
            disabled={validateForm()}
            className={classes.newUserBtn}
            onClick={handleSubmit}
          >
            Add user
          </button>
        ) : (
          <button
            disabled={!profileImg}
            className={classes.newUserBtn}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewUser;
