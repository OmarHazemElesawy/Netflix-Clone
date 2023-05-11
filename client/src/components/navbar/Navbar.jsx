import React, { useContext, useState } from "react";
import "./navbar.scss";
import logo from "../../images/netflix_logo.svg";
import { Search, Notifications, ArrowDropDown } from "@mui/icons-material";
import profileIcon from "../../images/neflix_profile.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/authContext/AuthContext";
import { logout } from "../../store/authContext/AuthActions";
const Navbar = () => {
  const [pageScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={pageScrolled ? "navbar scrolled" : "navbar"}>
      <div className="navbarContainer">
        <div className="navbarLeft">
          <img src={logo} alt="netflix logo" />
          <Link className="navbarLink" to="/">
            <span>Home</span>
          </Link>
          <Link className="navbarLink" to="/movies">
            <span className="navbarStay">Movies</span>
          </Link>
          <Link className="navbarLink" to="/series">
            <span className="navbarStay">Series</span>
          </Link>
          <span style={{ color: "grey" }}>Latest</span>
          <span style={{ color: "grey" }}>My List</span>
        </div>
        <div className="navbarRight">
          <Search className="rightIcon" />
          <span>Kids</span>
          <Notifications className="rightIcon" />
          <img src={user? user.info.profileImg: profileIcon} alt="profile icon" />
          <div className="profileDropdown">
            <ArrowDropDown className="rightIcon" />
            <div className="dropdownOptions">
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
