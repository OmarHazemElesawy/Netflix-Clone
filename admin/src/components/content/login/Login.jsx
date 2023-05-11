import React from "react";
import classes from "./Login.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../store/authContext/AuthContext";
import { login } from "../../../store/authContext/apiCalls";
import ErrorMessage from "../../errorMessage/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isFetching, dispatch } = useContext(AuthContext);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
    }
  }, [error]);

  const handleCloseModal = () => {
    setModalMessage(null);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    await login({ email, password }, dispatch);
  };
  

  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h3>Login</h3>
        <form className={classes.userForm} action="">
          <label className={classes.userLabel} htmlFor="email">
            Email
          </label>
          <input
            className={classes.userInput}
            id="email"
            placeholder="email"
            type="email"
            onChange={emailChangeHandler}
          />
          <label className={classes.userLabel} htmlFor="password">
            Password
          </label>
          <input
            className={classes.userInput}
            id="password"
            placeholder="password"
            type="password"
            onChange={passwordChangeHandler}
          />
          <button
            disabled={isFetching}
            onClick={loginHandler}
            className={classes.userButton}
          >
            Login
          </button>
        </form>
        <ErrorMessage message={modalMessage} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Login;
