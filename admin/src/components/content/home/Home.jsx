import React from "react";
import classes from "./Home.module.css";
import Info from "../../Info/Info";
import Charts from "../../charts/Charts";
import SmallWidget from "../../widgets/smallWidget/SmallWidget";
import LargeWidget from "../../widgets/largeWidget/LargeWidget";
import { useState, useEffect } from "react";
import axios from "axios";
import { months } from "../../../months";

const Home = () => {
  const [usersStats, setUserStats] = useState([]);
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getUserStats = async () => {
      try {
        setUserStats([]);
        const res = await axios.get(baseUrl + "users/stats", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const sortedData = res.data.sort((a, b) => a._id - b._id);
        sortedData.map((stat) =>
          setUserStats((prev) => [
            ...prev,
            { name: months[stat._id - 1], "New Users": stat.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();
  }, [baseUrl]);
  return (
    <div className={classes.home}>
      <Info />
      <Charts
        data={usersStats}
        title="User Analytics"
        dataKey="New Users"
        grid={true}
      />
      <div className={classes.homeWidgets}>
        <SmallWidget />
        <LargeWidget />
      </div>
    </div>
  );
};

export default Home;
