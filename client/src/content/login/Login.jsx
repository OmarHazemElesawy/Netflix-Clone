import "./login.scss";
import logo from "../../images/netflix_logo.png";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/authContext/AuthContext";
import { login } from "../../store/authContext/apiCalls";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

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
    <div className="login">
      <div className="containerTop">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="containerMain">
        <form action="">
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="username@email.com"
            onChange={emailChangeHandler}
          />
          <input
            type="password"
            placeholder="password"
            onChange={passwordChangeHandler}
          />
          <button
            className="loginBtn"
            disabled={isFetching}
            onClick={loginHandler}
          >
            Sign In
          </button>
          <span>
            New User?
            <Link className="signUpLink" to="/register">
              <b>Sign up</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>
          </small>
        </form>
        <ErrorMessage message={modalMessage} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Login;
