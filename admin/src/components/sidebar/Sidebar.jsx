import React from "react";
import classes from "./Sidebar.module.css";
import {
  Home,
  Group,
  LiveTv,
  Add,
  Movie,
  PersonAdd,
  List,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarInner}>
        <div className={classes.sidebarMenu}>
          <ul className={classes.sidebarList}>
            <Link className={classes.sidebarLink} to="/">
              <li className={`${classes.sidebarItem} ${classes.active}`}>
                <Home className={classes.sidebarIcon} />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h4 className={classes.sidebarTitle}>Users</h4>
          <ul className={classes.sidebarList}>
            <Link className={classes.sidebarLink} to="/users">
              <li className={classes.sidebarItem}>
                <Group className={classes.sidebarIcon} />
                Users List
              </li>
            </Link>
            <Link className={classes.sidebarLink} to="/newUser">
              <li className={classes.sidebarItem}>
                <PersonAdd className={classes.sidebarIcon} />
                Add User
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h4 className={classes.sidebarTitle}>Movies</h4>
          <ul className={classes.sidebarList}>
            <Link className={classes.sidebarLink} to="/movies/movie">
              <li className={classes.sidebarItem}>
                <Movie className={classes.sidebarIcon} />
                Movies List
              </li>
            </Link>
            <Link className={classes.sidebarLink} to="/newMovie/movie">
              <li className={classes.sidebarItem}>
                <Add className={classes.sidebarIcon} />
                Add Movie
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h4 className={classes.sidebarTitle}>Series</h4>
          <ul className={classes.sidebarList}>
            <Link className={classes.sidebarLink} to="/movies/series">
              <li className={classes.sidebarItem}>
                <LiveTv className={classes.sidebarIcon} />
                Series List
              </li>
            </Link>
            <Link className={classes.sidebarLink} to="/newMovie/series">
              <li className={classes.sidebarItem}>
                <Add className={classes.sidebarIcon} />
                Add Series
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h4 className={classes.sidebarTitle}>Lists</h4>
          <ul className={classes.sidebarList}>
            <Link className={classes.sidebarLink} to="/lists">
              <li className={classes.sidebarItem}>
                <List className={classes.sidebarIcon} />
                Lists of content
              </li>
            </Link>
            <Link className={classes.sidebarLink} to="/newList">
              <li className={classes.sidebarItem}>
                <Add className={classes.sidebarIcon} />
                Add List
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
