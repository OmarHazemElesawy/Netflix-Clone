import React, { useEffect, useState } from "react";
import "./featured.scss";
import { PlayArrow } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
const Featured = (props) => {
  const { type, setGenre } = props;
  const [feature, setFeature] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getRandomFeature = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/movies/random${type ? "?type=" + type : ""}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFeature(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomFeature();
  }, [type, baseUrl]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span> {type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
      )}
      <img src={feature.mainImg} alt="" />
      <div className="info">
        <img src={feature.titleImg} alt="" />
        <span className="description">{feature.description}</span>
        <Link className="buttonLink" to="/watch" state={{ movie: feature }}>
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
