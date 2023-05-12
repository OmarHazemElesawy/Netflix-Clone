import { useState, useRef } from "react";
import "./register.scss";
import logo from "../../images/netflix_logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../images/neflix_profile.png";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();
  const registerUrl = process.env.REACT_APP_REGISTER_URL;

  const validateInput = (username, password) => {
    let isValid = true;
    let errorMessage = "";
    if (username.length < 3) {
      isValid = false;
      errorMessage += "Username must be at least 3 characters long. ";
    }
    if (password.length < 6) {
      isValid = false;
      errorMessage += "Password must be at least 6 characters long. ";
    }
    return { isValid, errorMessage };
  };

  const handleEmailRegister = () => {
    setEmail(emailRef.current.value);
    emailRef.current.value = "";
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { isValid, errorMessage } = validateInput(username, password);
    if (!isValid) {
      setModalMessage(errorMessage);
      return;
    }
    try {
      const data = { email, username, password, profileImg };
      console.log(data);
      await axios.post(registerUrl, data);
      navigate("/login");
    } catch (err) {
      setModalMessage(err.response.data);
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setModalMessage(null);
  };

  return (
    <div className="register">
      <div className="containerTop">
        <img className="logo" src={logo} alt="logo" />
        <Link className="signInLink" to="/login">
          <button className="loginBtn">Sign In</button>
        </Link>
      </div>
      <form className="containerMain">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input ref={emailRef} type="email" placeholder="user@email.com" />
            <button onClick={handleEmailRegister} className="registerBtn">
              Get Started
            </button>
          </div>
        ) : (
          <div className="input">
            <input
              onChange={handleUsername}
              type="text"
              placeholder="username"
            />
            <input
              onChange={handlePassword}
              type="password"
              placeholder="password"
            />
            <button onClick={handleRegister} className="registerBtn">
              Sign Up
            </button>
          </div>
        )}
      </form>
      <ErrorMessage message={modalMessage} onClose={handleCloseModal} />
    </div>
  );
};

export default Register;
