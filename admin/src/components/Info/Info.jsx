import React from "react";
import classes from "./Info.module.css";
import { useEffect, useContext, useState, useCallback } from "react";
import { MovieContext } from "../../store/movieContext/MovieContext";
import { getMovies } from "../../store/movieContext/apiCalls";
import axios from "axios";

const Info = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const [userCount, setUserCount] = useState(0);
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  const getUserCount = useCallback(async () => {
    try {
      const res = await axios.get(baseUrl + "users", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUserCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }, [baseUrl]);

  useEffect(() => {
    const getHomeInfo = async () => {
      await getMovies(dispatch);
      getUserCount();
    };
    getHomeInfo();
  }, [dispatch, getUserCount]);

  const getContentCount = (movies, type) => {
    return movies.reduce((total, movie) => {
      if (!movie.isSeries && type === "movies") return total + 1;
      else if (movie.isSeries && type === "series") return total + 1;
      return total;
    }, 0);
  };

  return (
    <div className={classes.info}>
      <div className={classes.infoItem}>
        <span className={classes.infoTitle}>Users</span>
        <div className={classes.infoMoneyContainer}>
          <span className={classes.infoMoney}>{userCount}</span>
        </div>
        <span className={classes.infoSub}>Total users count</span>
      </div>

      <div className={classes.infoItem}>
        <span className={classes.infoTitle}>Movies</span>
        <div className={classes.infoMoneyContainer}>
          <span className={classes.infoMoney}>
            {getContentCount(movies, "movies")}
          </span>
        </div>
        <span className={classes.infoSub}>Total movies count</span>
      </div>

      <div className={classes.infoItem}>
        <span className={classes.infoTitle}>Series</span>
        <div className={classes.infoMoneyContainer}>
          <span className={classes.infoMoney}>
            {getContentCount(movies, "series")}
          </span>
        </div>
        <span className={classes.infoSub}>Total series count</span>
      </div>
    </div>
  );
};

export default Info;
